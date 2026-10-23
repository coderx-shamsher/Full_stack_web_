import type { Request,Response, NextFunction } from "express" 
import { deleteFileByidQuery, getFileByIdQuery } from "../queries/file.queries.js"
import path from "node:path"
import { access, constants, unlink } from "node:fs/promises"
import { uploadDir } from "../middlewares/upload.middleware.js"

export const deleteFileController = async (req: Request, res: Response, next: NextFunction) => {
    const fileid = Number(req.params.fileid)

    if (!Number.isSafeInteger(fileid) || fileid <= 0) {
        return res.status(400).json({
            success: false,
            message: "invalid file ID: ",
        })
    }
    try {

        const file = await getFileByIdQuery(fileid);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found.",
            });
        }

        const filePath = path.resolve(uploadDir, file.stored_name);

        // Only allow a filename directly inside uploadDir.
        if (path.dirname(filePath) !== path.resolve(uploadDir)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file path.",
            });
        }

        await access(filePath, constants.F_OK);

        const affectedRows = await deleteFileByidQuery(fileid)

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "file record was not deleted "
            })
        }

        if (affectedRows === 1) {
            try {
                await unlink(filePath)
                
                console.log("\n File Unlinked from system and data deleted from db !! \n");
                // ok response 
                return res.status(200).json({
                    success: true,
                    message: "File deleted successfully.",
                    data: { fileId: fileid },
                })
            } catch (cleanupError) {
                console.error("file cleanup Failed ::: ", cleanupError);

                return res.status(500).json({
                    success: false,
                    message: "Metadata deleted, but physical file cleanup failed.",
                });
            }
        }
    }
    catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return res.status(404).json({
                success: false,
                message: "File is missing from storage.",
            });
        }

        return next(error);
    }
}