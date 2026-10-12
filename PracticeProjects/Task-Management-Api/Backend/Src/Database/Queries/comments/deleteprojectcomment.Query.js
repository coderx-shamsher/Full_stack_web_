import pool from "../../Config/mysql.pool.js";

export const deleteProjectCommentQuery = async (
  projectId,
  commentId,
  userId,
  res,next
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
  error.context = {
      controller: 'deleteProjectComments.Controller.js',
      file: "deleteprojectComment.Query.js",
      function: "deleteProjectCommentQuery ()",
      operation: "Comment Insertion Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
};
