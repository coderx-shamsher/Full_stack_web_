import express from 'express'
                              
const HealthRouter  =  express.Router() 
                                   
HealthRouter.get("/health",(req,res)=>{
    res.json({
        "success" : true,
        "Message"  : "Api is healthy !!"
    })
})


export default  HealthRouter            