import app from "./app.js";

// port 
const port = Number(process.env.Port)  || 5000 ; 

app.listen(port,()=>{
    console.log(`Server Running http://localhost:${port}`);
})