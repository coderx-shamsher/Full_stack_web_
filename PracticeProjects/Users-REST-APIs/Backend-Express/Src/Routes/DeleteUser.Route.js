import express from 'express'
import { DeleteUser } from '../Controllers/DeleteUser.queryy.js'


const DeleteUserRouter = express.Router()


DeleteUserRouter.get("/delete-user",(req,res)=>{
    res.status(200).json({
        message: "you need to give your user email and password !"
    })
})

DeleteUserRouter.delete("/delete-user",(req,res)=>{
    console.log(req.body)
    const {userId, email, password} = req.body
    DeleteUser(userId,email,password,res)
})



export default DeleteUserRouter