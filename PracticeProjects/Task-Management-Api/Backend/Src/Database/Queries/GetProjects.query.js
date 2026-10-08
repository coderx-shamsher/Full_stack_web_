import pool from "../Config/mysql.pool.js";

export const getProjectsQuery = async (userId) => {
  const [result] = await pool.query(
    `select * from projects where ownerId = ? `,
    [userId],
  );

  if(result.length > 0){ 
    
    console.log("\n ---------GetProject Db query --> \n");
    console.log(result);
    console.log("\n --------- Db query end --> \n");
    
    return result
  }

  return null
};
