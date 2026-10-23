import type { Request, Response, NextFunction } from "express";

export function validatePagination(req: Request, res: Response, next: NextFunction) {

    const pageParam = Number(req.query.page ?? 1)
    const limitParam = Number(req.query.limit ?? 10)

    if (
        typeof pageParam !== "number" ||
        typeof limitParam !== "number"
    ) {
        return res.status(400).json({
            success: false,
            Message: "page and limit must be number"
        })
    }


    const page = pageParam
    const limit = limitParam

    if (!Number.isSafeInteger(page) ||
        page < 1 ||
        !Number.isSafeInteger(limit) ||
        limit < 1 ||
        limit > 100
    ) {
        return res.status(400).json({
            success: false,
            message: "page must be >= 1 and limit must be between 1 and 100.",
        });
    }

    if(page > 100){
        return res.status(400).json({
            success: false,
            message: "Page not found | page must be 1 to 100.",
        });
    }
    return next() 
}