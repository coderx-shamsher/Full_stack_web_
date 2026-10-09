import pool from "../../Config/mysql.pool.js";

export const deleteProjectCommentQuery = async (
  projectId,
  commentId,
  userId,
  res,
) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM project_comments
         WHERE project_id = ?
           AND commentId = ?
           AND user_id = ?`,
      [projectId, commentId, userId],
    );

    if (result.affectedRows > 0) {
      console.log("\n ----- Delete Query Success Logs ---------\n");
      console.log("Result ->> ", result);
      console.log("\n ----- Delete Query Logs End ---------\n");

      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    }

    if (affectedRows === 0) {
      console.log("\n ----- Delete Query Success Logs ---------\n");
      console.log("Result ->> ", result);
      console.log("\n ----- Delete Query Logs End ---------\n");
      return res.status(404).json({
        success: false,
        message: "Comment not found or you are not its author",
      });
    }
  } catch (error) {
    console.log("\n ----- Delete Query Error Logs ---------\n");
    console.log("DB Error ->> ", error);
    console.log("\n ----- Delete Query Logs End ---------\n");
  }
};
