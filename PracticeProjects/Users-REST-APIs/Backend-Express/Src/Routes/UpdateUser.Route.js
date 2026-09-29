import express from 'express'
import { checkoutuser } from '../Controllers/UpdateUserCheckout.js'

const UpdateUserRouter = express.Router()


UpdateUserRouter.get("/update-user",(req,res)=>{
    res.status(200).json({
        message : "you need to give previous user detail and then updated user detail"
    })
})
UpdateUserRouter.patch("/update-user",(req,res)=>{
    const Previous_User_Detail = req.body
    console.log(Previous_User_Detail) 
   const previousUser = Previous_User_Detail.previousUserDetail
   const UpdateUserWith = Previous_User_Detail.update_with
 
     const {new_email,message} = UpdateUserWith

console.log(UpdateUserWith) 
console.log(new_email) 
console.log(message) 
   checkoutuser(previousUser,UpdateUserWith,res)

   

})



export default UpdateUserRouter