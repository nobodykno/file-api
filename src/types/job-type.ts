export interface IJobAttributes {
    id: number;
    project_id: number | null;
    status: string;
    progress: number;
    outputPath: string | null;
    completedAt: Date | null;
  }