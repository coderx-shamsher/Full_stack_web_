import pool from "../../Config/mysql.pool.js";

export async function InsertProjectCommentQuery(projectId, userId, comment, res) {
  try {
    const [createdComment] = await pool.query(
      `INSERT INTO project_comments
            (project_id, user_id, comment)
            VALUES (?, ?, ?)`,
      [projectId, userId, comment],
    );

    if (createdComment.affectedRows > 0) {
      console.log("\n ----- Insert Comment Query ------\n");
      console.log(createdComment);
      console.log("\n ----- Insert Comment Query End ------\n");

      return res.status(201).json({
        success: true,
        message: "Comment created successfully",
      });
    }

    if (createdComment.affectedRows === 0) {
      console.log("\n ----- Insert Comment Failed Logs ------\n");
      console.log(createdComment);
      console.log("\n ----- Insert Comment Failed End ------\n");

      return res.status(404).json({
        success: false,
        message: "Comment creation Failed",
      });
    }
  } catch (error) {
    console.log("\n ----- Insert Comment Error Logs ------\n");
    console.log(error);
    console.log("\n ----- Insert Comment Error Logs End ------\n");
  }
}
