import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "localhost",
    port : 3308,
    user : "ubuntu_root",
    password : "ubuntu_root",
    database : "usersApi",
})

function Ping(){
   
    pool.getConnection((err,connection)=>{
        if(err){
            console.log("Error in Db connection :",err)
        }
        else{
            console.log("\n !! Mysql DB is Connected SuccessFull !! <DB is Ready> \n")
        }
        connection.release()
    })
     
}

Ping()

export default pool