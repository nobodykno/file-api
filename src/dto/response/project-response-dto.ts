export interface IProjectDto {
    id: number;
  
    name: string;
  
    description: string;
  
    files_count: number;
  
    jobs_count: number;
  
    createdAt: Date | string;
  
    updatedAt: Date | string;
  }
  
  export interface ICreateProjectResponseDto {
    message: string;
  
    result: IProjectDto;
  }
  
  export interface IGetProjectResponseDto {
    message: string;
  
    result: IProjectDto;
  }
  

  export interface IUpdateProjectResponseDto {
    message: string;
  
    result: IProjectDto;
  }

  export interface IGetAllProjectsResponseDto {
    message: string;
  
    result: IProjectDto[];
  }
  
  export interface IDeleteProjectResponseDto {
    message: string;
  }

