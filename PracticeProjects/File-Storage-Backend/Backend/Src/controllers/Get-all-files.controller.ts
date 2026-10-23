import type { Request,Response, NextFunction } from "express" 
import { getAllFilesQuery } from "../queries/file.queries.js"

export const getAllFilesController =  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page ?? 1)
    const limit = Number(req.query.limit ?? 10)

    const offset = (page - 1) * limit
    try {

        const files = await getAllFilesQuery(limit,offset)

        if (files.length > 0) {
            console.log("\n All Files Fetched..... \n");
            console.log(files);
            console.log();

            return res.status(200).json({
                success: true,
                count: files.length,
                data: files,
            });

        }
    } catch (error) {
        return next(error);
    }
}