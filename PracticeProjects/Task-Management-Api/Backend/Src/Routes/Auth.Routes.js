import express from 'express'
import { LookupUser } from '../Database/Queries/Check_Existing_user.js'
import { LookupUserForAuth } from '../Database/Queries/auth.query_for_exists.js'
import { AuthServiceLoginUser } from '../Services/Auth.service.js'

const AuthRouter = express.Router()


AuthRouter.post("/login",(req,res)=>{
    // console.log(req.body);
  
    const data = req.body
    LookupUserForAuth(data,res)
    // AuthServiceLoginUser(data,res)
  


})

export default AuthRouter