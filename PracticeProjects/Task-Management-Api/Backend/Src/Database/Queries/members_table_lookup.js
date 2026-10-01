import pool from "../Config/mysql.pool.js";

export async function MembersTableLookup() {
  try {
    const result =await pool.query(`select * from project_members`);
    if (result) {
      console.log("\nlookup table Successful !!-> \n");
      console.log(result);
    }
  } catch (error) {
    console.log("\n lookup failed!!  \n");
    console.log(error);
  }
}
