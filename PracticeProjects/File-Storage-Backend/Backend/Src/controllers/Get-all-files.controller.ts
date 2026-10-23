import type { Request, Response, NextFunction } from "express"
import { countFileQuery, getAllFilesQuery } from "../queries/file.queries.js"

export const getAllFilesController = async (req: Request, res: Response, next: NextFunction) => {

    const page = Number(req.query.page ?? 1)
    const limit = Number(req.query.limit ?? 10)

    // offset  -> 
    const offset = (page - 1) * limit

    const sortbyparam = req.query.sortBy ?? "created_at"
    const orderparam = req.query.order ?? "desc"

    const sortColumns: Record<string, string> = {
        created_at: "created_at",
        original_name: "original_name",
        size_bytes: "size_bytes",
    }

    if (
        typeof sortbyparam !== "string" ||
        typeof orderparam !== "string" ||
        !Object.hasOwn(sortColumns, sortbyparam) ||
        !['asc', 'desc'].includes(orderparam.toLowerCase())
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid sorting parameters.",
        })
    }

    const sortColumn = sortColumns[sortbyparam]
    const sortorder = orderparam.toUpperCase()

    // check if field is not in req then give response failed 
    if (!sortColumn) {
        return res.status(400).json({
            success: false,
            message: "Invalid sort column.",
        });
    }



    try {

        // -> 
        // const files = await getAllFilesQuery(limit,offset)

        const [files, totalItems] = await Promise.all([
            getAllFilesQuery(limit, offset, sortColumn, sortorder),
            countFileQuery()
        ])

        // Why Promise.all()? Dono database queries ek saath run ho sakti hain, kyunki count query ko files query ke result ki zarurat nahi hai.

        const totalpage = Math.ceil(totalItems / limit)

        if (files.length > 0) {
            console.log("\n All Files Fetched..... \n");
            console.log(files);
            console.log();

            return res.status(200).json({
                success: true,
                pagination: {
                    Page: page,
                    Limit: limit,
                    TotalItems: totalItems,
                    TotalPages: totalpage
                },
                // count: files.length,
                data: files,

            });

        }

        // ager page limit  totalpage limit se jada hoti hai to empty 200 response !!  
        if (page > totalpage) {
            return res.status(200).json({
                success: true,
                pagination: {
                    Page: page,
                    Limit: limit,
                    TotalItems: totalItems,
                    TotalPages: totalpage
                },
                // count: files.length,
                data: files,
            });
        }
    } catch (error) {
        return next(error);
    }
}