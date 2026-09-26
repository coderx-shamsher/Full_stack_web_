// import connection from "../Sql_DB_Connection";

import connection from "../Sql_DB_Connection.js";

export function CreateTable(){
   // we are creating schema basically 

    let query = ` CREATE TABLE users(
       userId VARCHAR(80) NOT NULL PRIMARY KEY,
       username VARCHAR(120) NOT NULL,
       email VARCHAR(200) UNIQUE NOT NULL,
       password VARCHAR(800) NOT NULL
    );`
  
    connection.query(query, (err, result) => {
    if (err) {
      console.log("❌ Error in Table Creation");
      console.log("   (Message): ->  ", err.message);
      console.log("   (Code):    -> ", err.code);
      console.log(" (SQL State):    ->", err.sqlState);
      return;
    }

    console.log("✅ Users table created successfully!");
    console.log(result);
  });  
}






