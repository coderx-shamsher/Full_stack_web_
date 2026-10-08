import pool from "../../Config/mysql.pool.js";

export const checkProjectOwnerMemberQuery = async (projectId, ownerId, res) => {
  try {
    // -> lookup for owner of project
    const [owner] = await pool.query(
      `SELECT projectId,ownerId
            FROM projects
            WHERE projectId = ?
            AND ownerId = ?`,
      [projectId, ownerId],
    );

    // -> loookup for project member
    const [member] = await pool.query(
      `SELECT project_id, memberId
           FROM project_members
           WHERE project_id = ?
           AND memberId = ?`,
      [projectId, ownerId],
    );

    if (owner.length > 0 || member.length > 0) {
      console.log("\n--------- project  Ownership/Membership L0gs --------\n");
      console.log("Project Owner  --> \n", owner);
      console.log();
      console.log("Project Member --> \n", member);
      console.log(
        "\n--------- project Ownership/Membership L0gs End --------\n",
      );
      return;
    }
    
    if (owner.length === 0 && member.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this project",
      });
    }

  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log("-->> Db Error: ", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    // return res.status(500).json({
    //   Success: false,
    //   Message: "Internal Server Error | DB Error",
    // });
  }
};
