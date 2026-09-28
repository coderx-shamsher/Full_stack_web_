import app from "./Express.Backend.js";

let port = 6369
let host = 'localhost'

app.listen(port,()=>{
    console.log(`Backend Server Running On http://${host}:${port}`)
})