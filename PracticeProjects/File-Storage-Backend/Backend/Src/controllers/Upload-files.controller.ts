import type { Request,Response, NextFunction } from "express" 
import path from "node:path";
import { createFileQuery } from "../queries/file.queries.js";
import { unlink } from "node:fs/promises";

export const uploadFilesController =  async (req: Request, res: Response, next: NextFunction) => {

    console.log("\n Uploaded file:", req.file, "\n");
    console.log("\n Current working directory:", process.cwd());
    if (!req.file) {
        return res.status(400).json({
            Success: false,
            Message: "Please upload a file..."
        })
    }

    const file = req.file

    const metadata = {
        originalName: file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        sizeBytes: req.file.size,
        storagePath: path.posix.join("uploads", file.filename)
    }

    try {

        const fileId = await createFileQuery(metadata)

        // const rows = await getAllFilesQuery()
        // console.log(rows);

        console.log("\n Inserted File Id -->> : ", fileId, '\n');

        if (typeof fileId !== "undefined") {
            return res.status(201).json({
                Success: true,
                Message: "file uploaded Successfully",
                data: {
                    fileId,
                    ...metadata
                }
            })
        }

        if (typeof fileId === "undefined") {
            return res.status(500).json({
                Success: false,
                Message: "file upload Failed...",
            })
        }
    } catch (error) {
        try {
            await unlink(file.path)
        } catch (cleanupError) {
            console.error("Failed to clean up uploaded file : ", cleanupError);
        }
        return next(error) // error go into upload error middleware 
    }
}