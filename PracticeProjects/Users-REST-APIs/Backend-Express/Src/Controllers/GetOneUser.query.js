import pool from "../Db/Server/db.server.connection.js";

export function GetOneUser(email,password,res){
     pool.query('select * from users where email=? AND password=?',[email,password],(err,Getuser)=>{
        if(err){
            console.log("\nError User Lookup :\n")
            console.log(err)
        }
        if(Getuser.length >0){
            console.log("\nlookup User is successful...!!\n")
            console.log(Getuser)
            return res.status(200).json({
                Message : "User Founded !!",
                user : Getuser
            })
        }
        if(Getuser.length === 0 ){
            console.log("User lookup Failed user not founded",Getuser)
            return res.status(404).json({
                Message :"User if not matched Email&Password Is something!"
            })
        }

    })
}