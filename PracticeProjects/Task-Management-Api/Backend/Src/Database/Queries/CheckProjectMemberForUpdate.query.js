import pool from "../Config/mysql.pool.js";

export const checkProjectMemberForUpdateQuery = async (
  projectId,
  memberId,
  res,
) => {
  try {
    const [existingMember] = await pool.query(
      `SELECT project_id, memberId
           FROM project_members
           WHERE project_id = ?
           AND memberId = ?`,
      [projectId, memberId],
    );

    if (existingMember.length > 0) {
      console.log("\n --------User(member) is Already Exists !!--------- \n");
      console.log("-->> Existing Member -->>", existingMember, "\n");
      console.log("\n --------User(member) is Already Exists !!--------- \n");
    }

    if (existingMember.length === 0) {
      console.log("\n --------member Not Exists !!--------- \n");
      console.log("-->> Member logs  -->>", existingMember, "\n");
      console.log("\n --------Logs End !!--------- \n");
      return res.status(404).json({
        Success: false,
        Message: "Project member not found",
      });
    }

  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log("Existing Founding Member Error:", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    return res.status(500).json({
      Success: false,
      Message: "Error In Founded Existing Member",
    });
  }
};
