import type { CreateFileInput, FileTypes } from "../types/file.types";
import type { OkPacketParams, ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/mysql.pool.js";

interface Filerow extends RowDataPacket, FileTypes { }

interface Countrow extends RowDataPacket {
  totalItems: number | string,
}

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
  let { originalName, storedName, mimeType, sizeBytes, storagePath } = input
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
        `, [originalName, storedName, mimeType, sizeBytes, storagePath])

    console.log("\n File is Inserted into DB... !! ");
    // return insertid  
    return result.insertId

  } catch (error) {
    console.error("Error in File Insertion.. \n", error);
  }
}


export async function getFileByIdQuery(fileId: number): Promise<FileTypes | null | undefined> {
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
            `, [fileId])

    return result[0] ?? null

  } catch (error) {
    console.error("Error in fetching file...\n", error);
  }
}

export async function getAllFilesQuery(limit: number, offset: number,sortColumn : string ,sortorder : string): Promise<FileTypes[]> {
  const [rows] = await pool.execute<Filerow[]>(
    `
      SELECT
        *
      FROM files
      ORDER BY ${sortColumn} ${sortorder}, file_id DESC
      limit ? offset ? 
    `, [limit, offset,sortColumn,sortorder]
  );

  return rows;
}

export async function deleteFileByidQuery(fileId: number): Promise<number> {
  // Delete metadata first, then the physical file.
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM files WHERE file_id = ?",
    [fileId]
  );

  return result.affectedRows
}

export async function countFileQuery(): Promise<number> {

  const [rows] = await pool.query<Countrow[]>(` select count(*) as totalItems from files`)

  return Number(rows[0]?.totalItems ?? 0)

  /**
    // Explaination 
    - COUNT(*) table ki total rows count karta hai.
    - AS totalItems result column ko readable naam deta hai.
    - number | string isliye, kyunki MySQL driver count ko number ya string ke form mein de sakta hai.
    -  Number(...) result ko number mein convert karta hai.
    - ?? 0 empty result ki situation mein fallback deta hai.

  */
}

