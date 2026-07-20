


import fs from "fs";
import path from "path";


import archiver from 'archiver';

import FILE_CONSTANTS from "../constants/index.js";
import type {
    ICreateJobRequestDto
} from "../dto/request/job-request-dto.js";
import type {
    ICreateJobResponseDto,
    IGetJobResponseDto,
    IGetJobStatusResponseDto
} from "../dto/response/job-response-dto.js";
import { AppError } from "../middleware/app-error.js";
import model from "../models/index.js";
import logger from "../logger/index.js";

import utils from "../utils/index.js";

export const createJobService = async (
    projectId: number,
    jobInfo: ICreateJobRequestDto
): Promise<ICreateJobResponseDto> => {

    utils.idValidators.validateProjectId(projectId);

    if (!jobInfo.fileIds || jobInfo.fileIds.length === 0) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.FILE_REQUIRED,
            400
        );
    }

    const project = await model.Project.findByPk(projectId);

    if (!project) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
            404
        );
    }

    // Fetch only the requested files belonging to this project
    const files = await project.getFiles({
        where: {
            id: jobInfo.fileIds,
        },
    });

    // Ensure all requested files exist
    if (files.length !== jobInfo.fileIds.length) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.FILE_NOT_FOUND,
            404
        );
    }

    const job = await model.Job.create({
        project_id: projectId, 
        status: "PENDING",
        progress: 0,
        fileIds: jobInfo.fileIds,
    });

    logger.jobLogger.created(job.id);

    // Start ZIP generation in the background
    void processZipJob(job.id, files);

    return {
        message: FILE_CONSTANTS.MESSAGES.JOB.CREATE_SUCCESS,
        result: job,
    };
};




const processZipJob = async (
    jobId: number,
    files: any
) => {

    try {


        await model.Job.update(
            {
                status: "RUNNING",
                progress: 10
            },
            {
                where: {
                    id: jobId
                }
            }
        );



        const outputFolder = path.join(
            process.cwd(),
            "zipfiles"
        );


        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }



        const zipFileName =
            `job-${jobId}-output.zip`;


        const zipFilePath =
            path.join(
                outputFolder,
                zipFileName
            );



        await createZipFile(
            zipFilePath,
            files,
        );



        await model.Job.update(
            {
                status: "COMPLETED",
                progress: 100,
                outputPath: zipFilePath,
                completedAt: new Date()
            },
            {
                where: {
                    id: jobId
                }
            }
        );



    }
    catch (error) {

        logger.jobLogger.errorZip(jobId, error);

        await model.Job.update(
            {
                status: "FAILED",
                progress: 0
            },
            {
                where: {
                    id: jobId
                }
            }
        );



    }

};





const createZipFile = (
    zipFilePath: string,
    files: any[],
) => {


    return new Promise((resolve, reject) => {


        const output =
            fs.createWriteStream(zipFilePath);


        const archive = archiver.create("zip", {
            zlib: {
                level: 9
            }
        });


        archive.pipe(output);



        files.forEach(file => {

            if (fs.existsSync(file.path)) {

                archive.file(
                    file.path,
                    {
                        name: file.name
                    }
                );

            }

        });



        output.on(
            "close",
            () => resolve(true)
        );



        archive.on(
            "error",
            err => reject(err)
        );


        void archive.finalize();



    });

};






export const getAllJobsService = async (
    projectId: number
): Promise<IGetJobResponseDto> => {


    if (!projectId) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
            400
        );
    }

    const project = await model.Project.findByPk(projectId);

    if (!project) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
            404
        );
    }

    const jobs =
        await project!.getJobs({
            order: [
                ["createdAt", "DESC"]
            ]
        });

    const jobCount = await project!.countJobs();

    logger.jobLogger.fetchedAll(jobCount);

    const response: IGetJobResponseDto = {
        message: FILE_CONSTANTS.MESSAGES.JOB.FETCH_SUCCESS,
        result: jobs
    };


    return response;

};






export const getJobStatusService = async (
    projectId: number,
    jobId: number
): Promise<IGetJobStatusResponseDto> => {

    if (!projectId) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
            400
        );
    }

    if (!jobId) {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.JOB_ID_NOT_FOUND,
            404
        );

    }

    const job =
        await model.Job.findOne({

            where: {
                id: jobId,
                project_id: projectId
            }

        });
    if (!job) {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.JOB_NOT_FOUND,
            404
        );

    }


    logger.jobLogger.getStatus(job.id);

    if (job.progress > 0 && job.progress < 98) {

        const response: IGetJobStatusResponseDto = {

            message: FILE_CONSTANTS.MESSAGES.JOB.INVALID_STATUS,
            result: job
        };
        return response;
    }
    else {
        const response: IGetJobStatusResponseDto = {

            message: FILE_CONSTANTS.MESSAGES.JOB.INVALID_STATUS,
            result: job
        };
        return response;
    }
};






export const downloadOutputService = async (
    projectId: number,
    jobId: number
) => {


    utils.idValidators.validateProjectId(projectId);
    utils.idValidators.validateJobId(jobId);
    const job =
        await model.Job.findOne({

            where: {
                id: jobId,
                project_id: projectId
            }

        });


    if (!job) {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.JOB_NOT_FOUND,
            404
        );

    }



    if (job.status !== "COMPLETED") {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.INVALID_STATUS,
            400
        );

    }



    if (!job.outputPath ||
        !fs.existsSync(job.outputPath)) {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.DOWNLOAD_ERROR,
            404
        );
    }
    return job.outputPath;


};