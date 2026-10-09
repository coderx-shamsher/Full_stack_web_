import pool from "../../Config/mysql.pool.js";

export async function deleteTaskByIdQuery(taskId, res) {
  try {
    const [deletedtask] = await pool.query(
      "delete from tasks where taskId = ?",
      [taskId],
    );

    if (deletedtask.affectedRows === 0) {
      console.log("\n --------- Detele Query Failed Logs ---------- \n");
      console.log(" Deletion Failed  -->>", deletedtask);
      console.log("\n --------- Query Failed Logs End ---------- \n");
      return res.status(404).json({
        Success: false,
        Message: "Task Not Deleted !!",
      });
    }

    if (deletedtask.affectedRows > 0) {
      console.log("\n --------- Delete Query  Success Logs ---------- \n");
      console.log(" Deletion Result -->>", deletedtask);
      console.log("\n --------- Query Success Logs End ---------- \n");
      return res.status(404).json({
        Success: true,
        Message: "Task Deleted Now !!",
      });
    }
  } catch (error) {
    console.log("\n --------- Db Error Logs ---------- \n");
    console.log(" DB Errors Of Deletion -->>", error);
    console.log("\n --------- Db Error Logs End ---------- \n");
  }
}
