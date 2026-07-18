export interface IFileDto {
    id: number;
    project_id: number;
    name: string;
    file_name: string;
    size: number;
    mime_type: string;
    path: string;
    uploadedAt: Date;
  }
  
  export interface IUploadFileResponseDto {
    message: string;
    result: IFileDto[];
  }
  
  export interface IGetProjectFilesResponseDto {
    message: string;
    count: number;
    result: IFileDto[];
  }
  
  export interface IDeleteFileResponseDto {
    message: string;
  }