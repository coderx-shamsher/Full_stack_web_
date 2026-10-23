import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import upload, { uploadDir } from "../middlewares/upload.middleware.js";
import path from "node:path";
import { createFileQuery, deleteFileByidQuery, getAllFilesQuery, getFileByIdQuery } from "../queries/file.queries.js";
import { unlink } from "node:fs/promises";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { error } from "node:console";
import { getAllFilesController } from "../controllers/Get-all-files.controller.js";
import { uploadFilesController } from "../controllers/Upload-files.controller.js";
import { getFilesByidController } from "../controllers/Get-filesbyid.controller.js";
import { downloadFileController } from "../controllers/downloadFile.controller.js";
import { deleteFileController } from "../controllers/deleteFile.controller.js";
import { validatePagination } from "../middlewares/validatePagination.js";

const fileRouter = Router()

// create handle route 

fileRouter.post('/files-test', upload.single("file"), (req: Request, res: Response) => {

    console.log("Uploaded file:", req.file);
    console.log("Current working directory:", process.cwd());
    if (!req.file) {
        return res.status(400).json({
            Success: false,
            Message: "Please upload a file..."
        })
    }

    return res.status(201).json({
        Success: true,
        Message: "file uploaded Successfully",
        file: {
            originalName: req.file.originalname,
            storedName: req.file.filename,
            mimeType: req.file.mimetype,
            sizeBytes: req.file.size,
            storagePath: req.file.path
        }
    })
})

fileRouter.post('/files', upload.single("file"),uploadFilesController)

fileRouter.get('/get-allfiles', validatePagination ,getAllFilesController)

fileRouter.get('/get-file/:fileid',getFilesByidController )

fileRouter.get('/get-file/:fileid/download',downloadFileController )

fileRouter.delete('/delete-file/:fileid', deleteFileController )

export default fileRouter