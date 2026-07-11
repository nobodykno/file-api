const Job = require('../models/job-model');
const File = require('../models/file-model');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

/**
 * 
 * @param ProjectId
 * @param fieldId
 * 
 */

const createJob = async (req, res) => {
  try {

    const projectId = parseInt(req.params.projectId);
    const { fileIds } = req.body;


    if (!fileIds || fileIds.length === 0) {
      return res.status(400).json({
        message: 'Please select at least one file!'
      });
    }


    const files = await File.findAll({
      where: {
        id: fileIds,
        project_id: projectId
      }
    });


    if (files.length === 0) {
      return res.status(404).json({
        message: 'No files found with given ids!'
      });
    }


    const job = await Job.create({
      project_id: projectId,
      status: 'PENDING',
      progress: 0,
      fileIds: JSON.stringify(fileIds)
    });



    res.status(201).json({
      message: 'Job created successfully!',
      job
    });


    processZipJob(job.id, files);

  } catch (err) {
    return res.status(500).json({
      message: 'Job not created!',

    });

  }
};

/**
 * 
 * @param JobId
 * @param files
 *  Process zip files
 */
const processZipJob = async (jobId, files) => {
  try {

    //Query to update job status
    await Job.update(
      { status: 'RUNNING', progress: 10 },
      { where: { id: jobId } }
    );

    const outputFolder = path.join(__dirname, '../zipfiles');
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    let totalSize = 0;
    files.forEach((file) => {
      totalSize += file.size;
    });

    const zipFileName = `job-${jobId}-output.zip`;
    const zipFilePath = path.join(outputFolder, zipFileName);


    await createZipFile(zipFilePath, files, jobId, totalSize);

    //Query to update job status
    await Job.update(
      {
        status: 'COMPLETED',
        progress: 100,
        outputPath: zipFilePath,
        completedAt: new Date()
      },
      { where: { id: jobId } }
    );


  } catch (err) {
    //Query to update job status
    await Job.update(
      { status: 'FAILED', progress: 0 },
      { where: { id: jobId } }
    );

  }
};

/**
 * 
 * @param {*} Storedzipfilepath 
 * @param {*} files 
 * @param {*} jobId 
 * @param {*} totalSize 
 * 
 */

const createZipFile = (zipFilePath, files, jobId, totalSize) => {
  return new Promise((resolve, reject) => {

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });


    archive.on('progress', async (progressData) => {


      const processedSize = progressData.fs.processedBytes;


      let percent = 0;
      if (totalSize > 0) {
        percent = Math.floor((processedSize / totalSize) * 100);
      }


      if (percent > 99) { percent = 99; }

      await Job.update(
        { progress: percent },
        { where: { id: jobId } }
      );
    });

    output.on('close', async () => {
      await Job.update(
        { progress: 90 },
        { where: { id: jobId } }
      );
      resolve();
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);


    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        archive.file(file.path, { name: file.name });
      }
    });

    archive.finalize();
  });
};


/**
 * 
 * @param {*} ProjectId 
 * 
 */

const getAllJobs = async (req, res) => {
  try {

    const projectId = parseInt(req.params.projectId);

    //Query to fimnd all jobs belongs to project
    const jobs = await Job.findAll({
      where: { project_id: projectId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Jobs fetched successfully!',
      result: jobs
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error in fetching  jobs!',
      err
    });
  }
};
/**
 * 
 * @param {*} jobId 
 * @param {*} projectId 
 * 
 */

const getJobStatus = async (req, res) => {
  try {

    const jobId = parseInt(req.params.jobId);
    const projectId = parseInt(req.params.projectId);

    //Query to fimnd all jobs status

    const job = await Job.findOne({
      where: { id: jobId, project_id: projectId }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found!' });
    }

    return res.status(200).json({
      message: 'Job fetched successfully!',
      job
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Job not fetched!',
    });
  }
};


/**
 * 
 * @param {*} jobId 
 * @param {*} projectId 
 * 
 */

const downloadOutput = async (req, res) => {
  try {

    const jobId = parseInt(req.params.jobId);
    const projectId = parseInt(req.params.projectId);

    // Query to find job 
    const job = await Job.findOne({
      where: { id: jobId, project_id: projectId }
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found!' });
    }


    if (job.status !== 'COMPLETED') {
      return res.status(400).json({
        message: `Job is ${job.status}. Please wait until COMPLETED!`
      });
    }


    if (!job.outputPath || !fs.existsSync(job.outputPath)) {
      return res.status(404).json({
        message: 'Output file not found!'
      });
    }

    // Download file
    const zipFileName = `job-${jobId}-output.zip`;
    res.download(job.outputPath, zipFileName);

  } catch (err) {
    return res.status(500).json({
      message: 'Error in downloading!'
    });
  }
};

module.exports = {
  createJob,
  getJobStatus,
  getAllJobs,
  downloadOutput
};