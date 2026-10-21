export interface FileTypes {
    file_id: number,
    original_name: string;
    stored_name: string;
    mime_type: string;
    size_bytes: number;
    storage_path: string;
    created_at: Date;
}

export interface CreateFileInput {
  originalName: string;
  storedName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
}