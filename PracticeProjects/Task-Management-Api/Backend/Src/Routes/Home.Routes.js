import express from 'express'
                              
const homeRouter  =  express.Router() 

homeRouter.get('/',(req,res)=>{
    res.send("<h2>Backend working checkout the api health on /api/health <h2>")
})

export default  homeRouter            