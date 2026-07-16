export interface IProjectAttributes {
    id: number;
    name: string;
    description: string | null;
    files_count: number;
    jobs_count: number;
    createdAt: Date;
    updatedAt: Date;
  }