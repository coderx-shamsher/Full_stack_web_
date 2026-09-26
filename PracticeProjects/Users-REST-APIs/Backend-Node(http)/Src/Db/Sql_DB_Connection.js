import mysql from 'mysql2'

const connection = mysql.createConnection({
    host : "localhost",
    user : "ubuntu_root",
    password : "ubuntu_root",
    database : 'usersApi',
    port : 3308
})

connection.connect((error)=>{
    if(error){
        console.log("Mysql connection failed (Message): \n",error.message)
        console.log("Mysql connection failed (Cause): \n",error.cause)
        return;
    }
    else{
        console.log(` !!! mysql Connection is Live (Database is Connected Successfully ---->)`)

    }
})

// connection.query('show tables in usersApi',(err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

// showtables()

//  let query = ` CREATE TABLE users(
//        userId VARCHAR(80) NOT NULL PRIMARY KEY,
//        username VARCHAR(120) NOT NULL,
//        email VARCHAR(200) UNIQUE NOT NULL,
//        password VARCHAR(800) NOT NULL
//     );`
  
//     connection.query(query, (err, result) => {
//     if (err) {
//       console.log("❌ Error in Table Creation");
//       console.log("   (Message): ->  ", err.message);
//       console.log("   (Code):    -> ", err.code);
//       console.log(" (SQL State):    ->", err.sqlState);
//       return;
//     }

//     console.log("✅ Users table created successfully!");
//     console.log(result);
//   });

export default connection;