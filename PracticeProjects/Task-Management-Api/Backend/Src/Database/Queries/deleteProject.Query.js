import { clearProjectCache } from "../../utils/clearProjectCache.js";
import pool from "../Config/mysql.pool.js";

export const deleteProjectQuery = async (projectId,onwerId, res, next) => {

  try {

   // const result = await pool.query(
   //   `select *  FROM projects WHERE projectId = ?`,
   //   [projectId],
   // );

    const [result] = await pool.query(
      `DELETE FROM projects WHERE projectId = ? AND ownerId = ? `,
      [projectId,onwerId],
    );


    if (result.affectedRows === 0) {
      console.log("-------Db Query Failed  -------\n");
      console.log(result);
      console.log("-------Db Query Failed end -------\n");
      return res.status(404).json({
        Success: false,
        Message: "Project Not Found",
        Warrning : "Maybe You Have No OwnerShip oF this Project !!"
      });
    }

    // clear cache from redis 
    await clearProjectCache(onwerId)
     
    console.log("----------DB Query SuccessFull ----------\n");
    console.log(result);
    console.log("----------DB Query SuccessFull ----------\n");
    return res.status(200).json({
      Success: true,
      Message: "Project deleted successfully",
    });

  } catch (error) {
      error.context = {
      controller: "DeleteProject.Controller.js",
      file: "deleteProject.Query.js",
      function: "deleteProjectQuery ()",
      operation: "project Deletion Failed !! ",
      layer: "Database Query",
    };
    next(error);
  }
};
