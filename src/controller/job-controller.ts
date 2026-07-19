import type { NextFunction, Request, Response } from "express";

import FILE_CONSTANTS from "../constants/index.js";
import service from "../service/index.js";


/**
 * Creates a new job for selected project files.
 *
 * @param req - Express request object containing projectId and selected fileIds.
 * @param res - Express response object.
 * @param next - Express next middleware function for error handling.
 *
 * @returns Created job details.
 */
export const createJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const projectId = Number(req.params.projectId);

        const response =
            await service.job.createJobService(
                projectId,
                req.body
            );


        return res
            .status(FILE_CONSTANTS.HTTP_STATUS.CREATED)
            .json(response);


    } catch (error) {

        next(error);

    }

};





/**
 * Fetches all jobs associated with a project.
 *
 * @param req - Express request object containing projectId.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 *
 * @returns List of project jobs.
 */
export const getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    try {


        const projectId =
            Number(req.params.projectId);



        const jobs =
            await service.job.getAllJobsService(
                projectId
            );



        return res
            .status(FILE_CONSTANTS.HTTP_STATUS.OK)
            .json({

                message:
                    FILE_CONSTANTS.MESSAGES.JOB.FETCH_SUCCESS,

                result: jobs

            });


    }
    catch (error) {

        next(error);

    }


};






/**
 * Fetches job status by jobId.
 *
 * @param req - Express request object containing projectId and jobId.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 *
 * @returns Job status details.
 */
export const getJobStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    try {


        const projectId =
            Number(req.params.projectId);


        const jobId =
            Number(req.params.jobId);



        const response =
            await service.job.getJobStatusService(
                projectId,
                jobId
            );



        return res
            .status(FILE_CONSTANTS.HTTP_STATUS.OK)
            .json(response);



    }
    catch (error) {

        next(error);

    }


};








/**
 * Downloads the generated zip file for a completed job.
 *
 * @param req - Express request object containing projectId and jobId.
 * @param res - Express response object used to send the file.
 * @param next - Express next middleware function.
 *
 * @returns Downloads generated zip file.
 */
export const downloadOutput = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    try {


        const projectId =
            Number(req.params.projectId);


        const jobId =
            Number(req.params.jobId);



        const filePath =
            await service.job.downloadOutputService(
                projectId,
                jobId
            );



        const fileName =
            `job-${jobId}-output.zip`;



        return res.download(
            filePath,
            fileName
        );



    }
    catch (error) {

        next(error);

    }


};