import { mkdir } from "node:fs/promises";
import app from "./app.js";
import { uploadDir } from "../middlewares/upload.middleware.js";

// port 
const port = Number(process.env.Port)  || 5000 ; 


await mkdir(uploadDir,{recursive : true})

console.log("Uploads directory : ",uploadDir);

app.listen(port,()=>{
    console.log(`Server Running http://localhost:${port}`);
})