import { LookupUser } from "../Database/Queries/Check_Existing_user.js";
import { CreateUserQuery } from "../Database/Queries/CreateUserQuery.js";
import crypto from 'crypto'

export async function CreateUserService(data,res,next){
    
     const { userId, email,password,username,role } = data; 
    
     if(!userId){
         return res.status(403).json({
            Success : false ,
            Message : "UserId Needed !"
        })
     }

     if(!username){
         return res.status(403).json({
            Success : false ,
            Message : "Username Needed !"
        })
     }

     if(!password){
         return res.status(403).json({
            Success : false ,
            Message : "Password Needed !"
        })
     }

     if(!role){
         return res.status(403).json({
            Success : false ,
            Message : "Role Needed !",
            "->" : "Defualt : user || admin"
        })
     }

     if(!email){
         return res.status(403).json({
            Success : false ,
            Message : "Email Needed !",
        })
     }

     if(typeof userId !== "number"){
        return res.status(403).json({
            Success : false ,
            Message : "UserId type invalid !! (only Numbers)"
        })
     }

     if(typeof email !== "string"){
        return res.status(403).json({
            Success : false ,
            Message : "Email type invalid !! (only String)"
        })
     }

     if(typeof username !== "string"){
        return res.status(403).json({
            Success : false ,
            Message : "Username type invalid !! (only String)"
        })
     }

     if(typeof password !== "string"){
        return res.status(403).json({
            Success : false ,
            Message : "Password type invalid !! (only String)"
        })
     }

     if( role && typeof role !== "string"){
        return res.status(403).json({
            Success : false ,
            Message : "Role type invalid !! (only String)"
        })
     }

    // Step 1 Creating hash
    // console.log(data.password)
    // password hashing
    const hashedPassoword =  crypto.createHash("sha256").update(data.password).digest("hex")
    data.password = hashedPassoword
    //  console.log(data.password)
    
    // step 2 checkout existing user in db 
    LookupUser(data,res,next)
  
}