import pool from "../../Config/mysql.pool.js";

export const getprojectcommentsQuery = async (projectId, res) => {
  try {
    const [comments] = await pool.query(
      `SELECT
            *
         FROM project_comments
         WHERE project_id = ?
         ORDER BY created_at DESC`,
      [projectId],
    );

    if (comments.length > 0) {
      console.log("\n -----Get Comments Query Logs-----\n");
      console.log("project comments -->> \n", comments);
      console.log("\n -----Get Comments Logs  End -----\n");

      return res.status(200).json({
        Success: true,
        Message: "All project Comments",
        Comments: comments,
      });
    }
  } catch (error) {
    console.log("\n ---Db Error logs ------>> \n");
    console.log("Get project Comments Error -->> \n", error);
    console.log("\n----Error logs End ------------\n ");
  }
};
