import pool from "../../Config/mysql.pool.js";

// this file is for get Task by taskId query !!! 
export async function TaskExistsQuery(taskId, project_Id, res, next) {
  try {
    const [task] = await pool.query(
      `select * from tasks where taskId = ? AND project_Id`,
      [taskId, project_Id],
    );

    if (task.length > 0) {
      console.log("\n ---------Task Lookup Query Logs ----------  \n");
      console.log("Task --> \n", task);
      console.log("\n ---------Task Lookup Query Logs End----------  \n");
      return res.status(200).json({
        Success: true,
        Message: "Task Fetched....!!",
        Tasks: task,
      });
    }

    if (task.length === 0) {
      console.log("\n ---------Task Lookup Failed Logs ----------  \n");
      console.log("Task --> \n", task);
      console.log("\n ---------Task Lookup Failed Logs End ----------  \n");

      return res.status(404).json({
        Message: "Task Not Found !!!",
        Success: false,
      });
    }
  } catch (error) {
    error.context = {
      controller: "getTasksById.Controller.js",
      file: "TasksExist.Query.js",
      function: "TasksExistQuery()",
      operation: "Task Fetch/(get task by taskId) Failed !! ",
      layer: "Database Query",
    };
    next(error);
  }
}
