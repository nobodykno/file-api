import type { Optional } from "sequelize";

export interface IProjectAttributes {
    id: number;
    name: string;
    description: string;
    files_count: number;
    jobs_count: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: number
  }



  export type IProjectCreationAttributes = Optional<
  IProjectAttributes,
  "id" | "files_count" | "jobs_count" | "createdAt" | "updatedAt" | "user_id"
>;