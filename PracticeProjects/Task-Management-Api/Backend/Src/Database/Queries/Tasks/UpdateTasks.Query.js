import pool from "../../Config/mysql.pool.js";

export const updateTaskQuery = async (req, res,taskId,project_Id) => {
  try {
    console.log(req.body);

    // validate data
    const { title, description, status, priority, due_date, assigned_to } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Task description is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Task status is required",
      });
    }
    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Task priority is required",
      });
    }

    if (!due_date) {
      return res.status(400).json({
        success: false,
        message: "Task due_date is required",
      });
    }
    if (!assigned_to) {
      return res.status(400).json({
        success: false,
        message: "Task assign_to  is required",
      });
    }

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
    console.log("\n -------- Update Error Logs --------- \n");
    console.log("Update Errors --> ", error);
    console.log("\n -------- Update Error Logs End -------\n");
  }
};
