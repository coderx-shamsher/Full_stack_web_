import pool from "../Config/mysql.pool.js";

export async function UserTableLookup() {
      try {

       const result =  await pool.query('select * from users')

       if(result){
          console.log("\nUser table Fetched from db -> \n")
          console.log(result)
       }
      } catch (error) {
        console.log("\nUser Table fetching (Failed) !!\n")
        console.log(error)
      }
}