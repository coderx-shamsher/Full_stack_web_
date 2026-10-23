import type { Request, Response, NextFunction } from "express"
import { getFileByIdQuery } from "../queries/file.queries.js"

export const getFilesByidController = async (req: Request, res: Response, next: NextFunction) => {
    const fileid = Number(req.params.fileid)

    if (!Number.isInteger(fileid) || fileid <= 0) {
        return res.status(400).json({
            Success: false,
            message: "Invaild file ID "
        })
    }

    try {
        const file = await getFileByIdQuery(fileid)

        if (!file) {
            return res.status(404).json({
                Success: false,
                message: "file not found. "
            })
        }

        if (file) {
            console.log("\n File Fetched -> ", file, "\n");
            return res.status(200).json({
                Success: true,
                message: "File Are Fetched....",
                data: file
            })
        }
    } catch (error) {
        return next(error)
    }
}