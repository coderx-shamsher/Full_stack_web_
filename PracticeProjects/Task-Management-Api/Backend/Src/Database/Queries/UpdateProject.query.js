import pool from "../Config/mysql.pool.js";

export const updateProjectQuery = async (
  projectId,
  projectName,
  description,
  projectStatus,
  ownerId,
  res,
) => {
  try {
    const [result] = await pool.query(
      `UPDATE projects
       SET
         projectName = ?,
         description = ?,
         projectStatus = ?
       WHERE projectId = ? AND ownerId =? `,
      [projectName, description, projectStatus, projectId, ownerId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Success: false,
        Message: "Project not found",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Project updated successfully",
      UpdatedProject: result[0],
    });

  } catch (error) {
    console.log("Update Project Error:", error);

    return res.status(500).json({
      Success: false,
      Message: "Failed to update project",
    });
  }

};
