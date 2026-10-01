import { LookupUser } from "../Database/Queries/Check_Existing_user.js";
import { CreateUserQuery } from "../Database/Queries/CreateUserQuery.js";
import crypto from 'crypto'

export async function CreateUserService(data,res){
     
    // Step 1 Creating hash
    // console.log(data.password)
    // password hashing
    const hashedPassoword =  crypto.createHash("sha256").update(data.password).digest("hex")
    data.password = hashedPassoword
    //  console.log(data.password)
    
    // step 2 checkout existing user in db 
    LookupUser(data,res)
  
}