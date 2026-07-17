import { Optional } from "sequelize";

export interface IJobAttributes {
    id: number;
    project_id: number | null;
    status: string;
    progress: number;
    outputPath: string | null;
    completedAt: Date | null;
    fileIds:number[]
  }

    export type ICreateJobRequestDto = Optional<
    IJobAttributes,
    "id" | "project_id"
  >;