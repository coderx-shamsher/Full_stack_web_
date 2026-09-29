import pool from "../Db/Server/db.server.connection.js";

export function DeleteUser(userId,email,password,res){
    
    // -> lookup users and validate 
    pool.query("select * from users where email=? AND password=?",[email,password],(err,UserExists)=>{
      if(err){
            console.log("\n Error In Lookup User !! \n",err,"\n")
        }
        if(UserExists.length >0){
           console.log("\nUser is Exists !! \n",UserExists,"\n")
           
             pool.query("delete from users where email=? AND userId=?",[email,userId],(err,DeleteResult)=>{
                 
                  if(err) {
                      console.log("\nError Deletion IS Failed !!  :\n",err)
                  }
                  
                  
                  if(DeleteResult){
                    console.log("user Deleted SuccessFully !!!",DeleteResult)
                     return res.status(200).json({
                          Message : "user is Remove From db !! "
                        
                     })
                }

              }) 
            

        }
        if(UserExists.length ===0){
            res.status(404).json({
                Message : "User was not found"
            })
        }

    })
}