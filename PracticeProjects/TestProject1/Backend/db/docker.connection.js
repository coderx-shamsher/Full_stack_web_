
import mysql from "mysql2";



const sqldb = mysql.createConnection({
    host:'localhost',
    port: 3307,
    user :'coderxmysql',
    password: 'coderxmysql',
    database:'myapp'

}) 

sqldb.connect((err)=>{
    if(!err){
        console.log("♾️ Mysql Database is Connected Successfully!")
    }
    else{
         console.log("❌ Database connection failed:", err.message)
    }
});

export default sqldb;