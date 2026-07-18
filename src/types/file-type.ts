import { Optional } from "sequelize";

export interface IFileAttributes {
  id: number;
  project_id: number;
  name: string;
  file_name: string;
  size: number;
  mime_type: string;
  path: string;
  uploadedAt: Date;
}

export type IFileCreationAttributes = Optional<
  IFileAttributes,
  "id" | "uploadedAt" | "mime_type"
>;