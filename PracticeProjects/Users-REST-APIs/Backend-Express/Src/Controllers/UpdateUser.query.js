import pool from "../Db/Server/db.server.connection.js";

export function UpdateUser(new_email,oldemail,message,res){
     // First -> Read the Message ->>
     console.log(" \n  Reading the User Message \n","Message -> ",message,"\n")

       pool.query('update users set email=? where email=?',[new_email,oldemail],(err,UpdateResult)=>{
         if(err){
            console.log("\nError in Update User From db :\n",err,"\n")
         }
         if(UpdateResult){
             console.log("\nUpdated successfull !!\n","\n",UpdateResult)

               pool.query("select * from users where email=?",[new_email],(err,NewUpdatedUser)=>{
               if(err){
                console.log("\nUpdated User Is not Founded DB Error :\n",err,"\n")
               }

               // Updated User Response back to user
              if(NewUpdatedUser) {
                return res.status(200).json({
                    Message : "user detail are updated !! ->" ,
                    user: NewUpdatedUser
                })
              }
           })
         }
       })
}