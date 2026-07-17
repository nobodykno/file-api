export interface ICreateJobRequestDto {
    project_id: number
    fileIds: number[];
    status: string,
    progress: number,
}