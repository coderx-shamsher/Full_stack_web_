import express from 'express'
import cors  from 'cors'
import cookieParser from 'cookie-parser'

const app = express() 


// cors config
app.use(cors({
    origin : process.env.CORS_ORG,
    credentials : true
}))

// json() -> for accepting data json data with limit 
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit: "20kb"}))

// setup static file severing using express static 
app.use(express.static('public'))

// error handling 
app.on("Error",(error)=>{
    console.log("Error : Express Connection failed with DB \n", error)
    throw error
})

export default app 