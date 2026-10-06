import pool from "../Config/mysql.pool.js";

export const updateProjectMemberQuery = async (
  projectId,
  memberId,
  role,
  res,
) => {
  try {
    const [result] = await pool.query(
      `UPDATE project_members
     SET role = ?
     WHERE project_id = ?
     AND memberId = ?`,
      [role, projectId, memberId],
    );
    
    console.log("---------Update Query Logs ----------\n")
    console.log("Update --> ",result)
    console.log("\n---------Update Query Logs Ends ----------\n")
    return res.status(200).json({
      Success: true,
      Message: "Project member updated successfully"
    });
 } catch (error) {
    console.log("-----Error Db Logs ------------\n")
    console.log("Update Project Member Error:", error);
    console.log("-----Error Db Logs Ends------------\n")
    return res.status(500).json({
      Success: false,
      Message: "Internal Server | DB Errors ",
    });
  }
};
