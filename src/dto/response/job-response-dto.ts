export interface IJobDto {
    id: number;
    project_id: number;
    status: string;
    progress: number;
    outputPath?: string | null;
    completedAt?: Date | null;
    fileIds:number[]
;  }
  
  
  export interface ICreateJobResponseDto {
    message: string;
    result: IJobDto;
  }
  
  
  export interface IGetJobResponseDto {
    message: string;
    result: IJobDto[];
  }

  export interface IGetJobStatusResponseDto{
    message: string;
    result: IJobDto;
  }