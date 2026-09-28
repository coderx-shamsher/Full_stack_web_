import express from 'express'

const TestRouter = express.Router()


TestRouter.get("/",(req,res)=>{
    res.send("hello / its express backend")
})

TestRouter.get("/home",(req,res)=>{
    res.send("hello  its /home express backend")
})

export default TestRouter