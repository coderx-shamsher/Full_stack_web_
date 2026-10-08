import pool from "../../Config/mysql.pool.js";

export const getProjectTasksQuery = async (projectId,res) => {
  try {
    const [result] = await pool.query(
      `SELECT *
     FROM tasks
     WHERE project_id = ?`,
      [projectId],
    );

    console.log()
    console.log("\n --------DB Query Fetch L0gs  ---------\n")
    console.log("Fetch Tasked : ",result)
    console.log("\n --------DB Query Fetch L0gs End ---------\n")
    return res.status(200).json({
      success: true,
      tasks: result,
    });

  } catch (error) {
    console.log("\n -------- DB Error in Tasks Fetch --------\n")
    console.error("Get Project Tasks Error:", error);
    console.log("\n -------- DB Error in End --------\n")
    return res.status(500).json({
      success: false,
      message: "Internal server error | Tasks Not Fetched ... ",
    });

  }
};
