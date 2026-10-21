import pool from "../config/mysql.pool.js";
import { createFileQuery, getAllFilesQuery, getFileByIdQuery } from "./file.queries.js";

async function testFileQueries(): Promise<void> {
  try {
   
    
    // const fileId = await createFileQuery({
    //   originalName: "demo.txt",
    //   storedName: "demo-test-001.txt",
    //   mimeType: "text/plain",
    //   sizeBytes: 120,
    //   storagePath: "uploads/demo-test-001.txt",
    // });
    // one time run 
    // console.log("Inserted file ID:", fileId);
   
    const fileid = 1

    const file = await getFileByIdQuery(fileid);
    console.log("\n Fetched file:", file,"\n");
  
    const files = await getAllFilesQuery();
    console.log("\n Total files fetched:", files.length,"\n");
  } catch (error) {
    console.error("\n File query test failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

export default testFileQueries;