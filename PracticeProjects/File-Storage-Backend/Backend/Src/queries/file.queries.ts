import type { CreateFileInput, FileTypes } from "../types/file.types";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/mysql.pool.js";

interface Filerow extends RowDataPacket, FileTypes { }


export async function createTable(): Promise<void> {
    const query = `
    CREATE TABLE IF NOT EXISTS files (
      file_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      original_name VARCHAR(255) NOT NULL,
      stored_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(127) NOT NULL,
      size_bytes BIGINT UNSIGNED NOT NULL,
      storage_path VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

      PRIMARY KEY (file_id),
      UNIQUE KEY uq_files_stored_name (stored_name),
      INDEX idx_files_created_at (created_at)
    );
  `;

    try {
        const result = await pool.query(query)

        if (result) {
            console.log("\nTable Created Successfully -> \n");
            console.log(result);
            console.log("\n         \n");
        }
    } catch (error) {
        console.error("\n Table creation Failed !! ->\n", error);
    }
}

// -- function jo k ek input object leta hai ..
export async function createFileQuery(input: CreateFileInput): Promise<number | undefined> {
    try {
        const [result] = await pool.query<ResultSetHeader>(`
         INSERT INTO files (
          original_name,
          stored_name,
          mime_type,
          size_bytes,
          storage_path
         )
          VALUES (?,?,?,?,?)
        `, [input.originalName, input.storedName, input.mimeType, input.sizeBytes, input.storagePath])

        // return insertid  
        return result.insertId

    } catch (error) {
        console.error("Error in File Insertion.. \n", error);
    }
}


export async function getFileByIdQuery(fileId: number): Promise<FileTypes | null> {
    try {
        const [result] = await pool.execute<Filerow[]>(`
             SELECT
                file_id,
                original_name,
                stored_name,
                mime_type,
                size_bytes,
                storage_path,
                created_at
                FROM files
                WHERE file_id = ?
                LIMIT 1
            `,[fileId])

            return result[0] ?? null 

    } catch (error) {
      console.error("Error in fetching file...\n", error);
    }
}

export async function getAllFilesQuery(): Promise<FileTypes[]> {
  const [rows] = await pool.execute<Filerow[]>(
    `
      SELECT
        file_id,
        original_name,
        stored_name,
        mime_type,
        size_bytes,
        storage_path,
        created_at
      FROM files
      ORDER BY created_at DESC, file_id DESC
    `
  );

  return rows;
}