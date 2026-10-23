import type { Request,Response, NextFunction } from "express" 
import { getFileByIdQuery } from "../queries/file.queries.js"
import path from "node:path"
import { uploadDir } from "../middlewares/upload.middleware.js"
import { access, constants } from "node:fs/promises"


export const downloadFileController =  async (req: Request, res: Response, next: NextFunction) => {
    const fileid = Number(req.params.fileid)

    if (!Number.isSafeInteger(fileid) || fileid <= 0) {
        return res.status(400).json({
            success: false,
            message: "invalid file ID: ",
        })
    }

    try {
        const file = await getFileByIdQuery(fileid)

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found.",
            });
        }

        // Build the disk path using the stored filename.
        //  path.resolve() — upload directory aur stored filename se absolute path banata hai.
        const filePath = path.resolve(uploadDir, file.stored_name);

        // ensure the resolved file stays inside uploadDir 
        if (path.dirname(filePath) !== path.resolve(uploadDir)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file path.",
            });
        }

        // tip -> Postman mein successful response par Save Response → Save to a file use karke downloaded file verify kar sakte ho.

        await access(filePath, constants.R_OK);

        return res.download(filePath, file.original_name, (error) => {
            if (error) {
                if (!res.headersSent) {
                    next(error)
                }
            }
        })

    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return res.status(404).json({
                Success: false,
                message: "file is missing from storage"
            })
        }
        return next(error)
    }
}