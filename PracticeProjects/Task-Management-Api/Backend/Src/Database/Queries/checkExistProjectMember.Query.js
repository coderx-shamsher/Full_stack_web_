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
      console.log("\n --------Db Query Logs (member Exists OR Not ) !!--------- \n");
      console.log("-->> Existing Member -->>", existingMember, "\n");
      console.log("\n --------DB Query Logs End !!--------- \n");
      return res.status(409).json({
        Success: false,
        Message: "User is already a member of this project",
      });
    }

    if (existingMember.length === 0) {
      console.log("\n --------member not Exists!! \n Insert This User Into This Project--------- \n");
      console.log("-->> Member logs  -->>", existingMember, "\n");
      console.log("\n --------Logs End !!--------- \n");
      // return res.status(404).json({
      //   Success: false,
      //   Message: "Project member not found",
      // });
    }
  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log("Existing Founding Member Error:", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    // return res.status(500).json({
    //   Success: false,
    //   Message: "Error In Founded Existing Member",
    // });
  }
};
