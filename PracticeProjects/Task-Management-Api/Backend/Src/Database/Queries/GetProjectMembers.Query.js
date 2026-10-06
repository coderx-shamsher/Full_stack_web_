import pool from "../Config/mysql.pool.js";
export const getProjectMembersQuery = async (projectId,res) => {
  try {
    const [members] = await pool.query(
      `SELECT project_id, memberId, role, joined_at
     FROM project_members
     WHERE project_id = ?`,
      [projectId],
    );

    console.log("\n >-----------< Query Success Logs >-----------> \n");
    console.log("\n --> Members --> \n", members);
    console.log("\n >-----------< Query Success Logs >-----------> \n");
    return res.status(200).json({
      Success: true,
      Members: members,
    });
  } catch (error) {
    console.log("\n>--------< Db Error  Logs >---------->\n");
    console.log("Get Project Members Error:", error);
    console.log("\n>--------< Db Error  Logs >---------->\n");
    return res.status(500).json({
      Success: false,
      Message: "Internal Server | Db Error ",
    });
  }
};
