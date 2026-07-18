import { logSuccess } from "../middleware/success-logger.js";

 const jobLogger = {
    created(jobId: number) {
      logSuccess({
        module: "Job",
        action: "CREATE",
        message: "Job created successfully",
        data: {
          jobId: jobId,
        },
      });
    },
  
    completed(jobId: number) {
      logSuccess({
        module: "Job",
        action: "COMPLETE",
        message: "Job completed successfully",
        data: {
            jobId: jobId,
        },
      });
    },
  
    failed(jobId: number) {
      logSuccess({
        module: "Job",
        action: "FAILED",
        message: "Job failed",
        data: {
            jobId:jobId,
        },
      });
    },
  
    downloaded(jobId: number) {
      logSuccess({
        module: "Job",
        action: "DOWNLOAD",
        message: "Zip downloaded successfully",
        data: {
            jobId:jobId,
        },
      });
    },
  
    fetched(jobId: number) {
      logSuccess({
        module: "Job",
        action: "GET",
        message: "Job fetched successfully",
        data: {
            jobId: jobId,
        },
      });
    },
  
    fetchedAll(count: number) {
      logSuccess({
        module: "Job",
        action: "GET_ALL",
        message: "Jobs fetched successfully",
        data: {
          totalJobs: count,
        },
      });
    },
  };

  export default jobLogger