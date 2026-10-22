import multer from "multer";
import type { ErrorRequestHandler } from "express";

export const uploadErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof multer.MulterError) {
        const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;

        res.status(status).json({
            Success: false,
            Message:
                error.code === "LIMIT_FILE_SIZE"
                    ? "file size must not exceed 10 mb" : "File upload limit exceeded",
        })
        return
    }

    if (error instanceof Error) {
        res.status(400).json({
            Success: false,
            message: error.message
        })
        return
    }

    res.status(500).json({
        Success : false,
        Message : "Internal Server Error,"
    })
}