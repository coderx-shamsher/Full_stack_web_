import multer from "multer";
import { error } from "node:console";
import { randomUUID } from "node:crypto";
import path from "node:path";

export const uploadDir = path.resolve(process.cwd(), "uploads")

// const storage = multer.diskStorage({
//     // destination : '../uploads',
//     destination: (req, file, callback) => {
//         callback(null, uploadDir)
//     },

//     filename: (req, file, callback) => {
//         const extension = path.extname(file.originalname);
//         const newfilename = `${randomUUID()}${extension}`

//         callback(null, newfilename)
//     },

// })
// const upload = multer({ storage })


// -
const maxFilesize = 10 * 1024 * 1024 // 10 mb 

const allowedMimeTypes: Record<string, string> = {
    // Documents
    ".pdf": "application/pdf",
    ".md": "text/markdown",

    // Web development
    //   ".html": "text/html",
    //   ".css": "text/css",
    //   ".js": "text/javascript",

    // Programming and scripting
    //   ".py": "text/x-python",
    //   ".sh": "application/x-sh",
    //   ".bash": "application/x-bash",

    // Images
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
}

// multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase()
        //--> creating new filename 
        callback(null, `${randomUUID()}${extension}`)
    },
})

function fileFilter(req: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void {
    const extension = path.extname(file.originalname).toLowerCase();
    const expectedMimeType = allowedMimeTypes[extension]

    if(!expectedMimeType || file.mimetype !== expectedMimeType){
        callback(new Error ("Only {png,jpg,jpeg,md,pdf} file types are allowed! "))
        return
    }

    callback(null,true)
}

const upload = multer({
    storage,
    limits : {
        fileSize : maxFilesize,
        files: 1,
    },
    fileFilter,
})

export default upload