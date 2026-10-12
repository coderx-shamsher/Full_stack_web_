import pool from "../Config/mysql.pool.js";
export const getProjectMembersQuery = async (projectId,res,next) => {
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
      error.context = {
      controller: 'getProjectMember.Controller.js',
      file: "GetProjectMembers.Query.js",
      function: "getProjectMembersQuery ()",
      operation: "all Project Member Fetch Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
};
