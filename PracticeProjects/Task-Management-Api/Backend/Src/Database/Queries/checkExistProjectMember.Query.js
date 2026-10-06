import pool from "../Config/mysql.pool.js";

export const checkExistProjectMemberQuery = async (
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
      console.log("-->> Existing Member -->>",existingMember,"\n");
      console.log("\n --------User(member) is Already Exists !!--------- \n");
      return res.status(409).json({
        Success: false,
        Message: "User is already a member of this project",
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
