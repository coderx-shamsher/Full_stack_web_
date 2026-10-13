import pool from "../../Config/mysql.pool.js";

export const updateTaskQuery = async (res,taskId,project_Id,next) => {
  try {
    
    const insertq = `UPDATE tasks
        SET 
         title = ? ,
        description = ?,
        status = ? ,
        priority = ?, 
        due_date = ? ,
        assigned_to = ?  WHERE taskId = ? AND project_id = ? 
        `;

    const [update] = await pool.query(insertq, [
      title,
      description,
      status,
      priority,
      due_date,
      assigned_to,
      taskId,
      project_Id
    ]);

    if (update.affectedRows === 0) {
      console.log("\n --------Db Update Query Failed Logs --------- \n");
      console.log("Updated Failed --> ", update);
      console.log("\n -------- Update Failed Logs End   ------------\n");

      return res.status(500).json({
        success: false,
        Message: "Updation Failed ....",
      });
    }

    if (update.affectedRows > 0 ) {
      console.log("\n --------Db Update Query Logs --------- \n");
      console.log("Updated --> ", update);
      console.log("\n -------- Update Logs End   ------------\n");

      return res.status(200).json({
        success: true,
        Message: "Updation Success  !!....!!",
      });
    }

  } catch (error) {  
    error.context = {
      controller: 'updateTask.Controller.js',
      file: "UpdateTasks.Query.js",
      function: "updateTasksQuery()",
      operation: "Task Update (by ID) Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
};
