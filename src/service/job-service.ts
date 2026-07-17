import model from "../models/index.js";



import {
    ICreateJobRequestDto
} from "../dto/request/job-request-dto.js";

import {
    ICreateJobResponseDto,
    IGetJobResponseDto,
    IGetJobStatusResponseDto,
    IJobDto
} from "../dto/response/job-response-dto.js";


import path from "path";
import fs from "fs";
import archiver from 'archiver'

import { AppError } from "../middleware/app-error.js";
import FILE_CONSTANTS from "../constants/index.js";
import { measureMemory } from "vm";



export const createJobService = async (
    projectId: number,
    jobInfo: ICreateJobRequestDto
): Promise<ICreateJobResponseDto> => {


    if (!jobInfo.fileIds || jobInfo.fileIds.length === 0) {
        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.FILE_REQUIRED,
            400
        );
    }


    const files = await model.File.findAll({
        where: {
            id: jobInfo.fileIds,
            project_id: projectId
        }
    });


    if (files.length === 0) {

        throw new AppError(
            FILE_CONSTANTS.MESSAGES.JOB.FILE_NOT_FOUND,
            404
        );
    }


    const job = await model.Job.create({
        project_id: jobInfo.project_id,
        status: "PENDING",
        progress: 0,
        fileIds: jobInfo.fileIds
    });


    processZipJob(job.id, files);


    return {
        message: FILE_CONSTANTS.MESSAGES.JOB.CREATE_SUCCESS,
        result: job
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
            jobId
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
    jobId: number
) => {


    return new Promise((resolve, reject) => {


        const output =
            fs.createWriteStream(zipFilePath);


        const archive = archiver.create("zip", {
            zlib: {
              level: 9
            }
          })


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


        archive.finalize();



    });

};






export const getAllJobsService = async (
    projectId: number
): Promise<IGetJobResponseDto> => {


    const jobs =
        await model.Job.findAll({

            where: {
                project_id: projectId
            },

            order: [
                ["createdAt", "DESC"]
            ]

        });


        const response:IGetJobResponseDto = {
            message:FILE_CONSTANTS.MESSAGES.JOB.FETCH_SUCCESS,
            result:jobs
        }


    return response;

};






export const getJobStatusService = async (
    projectId: number,
    jobId: number
): Promise<IGetJobStatusResponseDto> => {


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
 
    if(job.progress > 0 && job.progress < 98){
      
        const response: IGetJobStatusResponseDto= {

            message: FILE_CONSTANTS.MESSAGES.JOB.INVALID_STATUS,
            result: job
          }
          return response;
    }
    else{
        const response: IGetJobStatusResponseDto= {

            message: FILE_CONSTANTS.MESSAGES.JOB.INVALID_STATUS,
            result: job
          }
          return response;
    }
    




};






export const downloadOutputService = async (
    projectId: number,
    jobId: number
) => {


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