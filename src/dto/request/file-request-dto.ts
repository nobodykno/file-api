export interface IUploadFileRequestDto {
    projectId: number;
    files: Express.Multer.File[];
  }
  
  export interface IDeleteFileRequestDto {
    projectId: number;
    fileId: number;
  }
  
  export interface IGetProjectFilesRequestDto {
    projectId: number;
  }