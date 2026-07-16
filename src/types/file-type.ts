export interface IFileAttributes {
    id: number;
    project_id: number | null;
    name: string;
    file_name: string;
    size: number;
    mime_type: string | null;
    path: string | null;
    uploaded_at: Date;
  }