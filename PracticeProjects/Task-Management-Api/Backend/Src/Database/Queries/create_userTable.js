import pool from "../Config/mysql.pool.js";
 
export async function CreateUserTable(params) {
  try {
    let result = await pool.query(`
    CREATE TABLE users(
   
    userId INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(200) NOT NULL,

    userEmail VARCHAR(300) UNIQUE NOT NULL,

    password VARCHAR(500) NOT NULL,

    role ENUM('user', 'admin') DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON 
      UPDATE CURRENT_TIMESTAMP

   );
            
`);
   
  if(result) {
     console.log("\n User Table Created SuccessFully !!.. ")
     console.log(result)
  }

  } catch (error) {
     console.log("\n Error in User Table creation (failed) \n")
     console.log(error)
     
  }

}

