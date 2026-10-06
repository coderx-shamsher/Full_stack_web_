import pool from "../Config/mysql.pool.js";

export const addProjectMemberQuery = async (projectId, memberId, role,res) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO project_members
            (project_id, memberId, role)
            VALUES (?, ?, ?)`,
      [projectId, memberId, role],
    );
   
    console.log("\n -------DB Query Success -------- \n")
    console.log(result)
    console.log("\n -------DB Query End -------- \n")
    return res.status(201).json({
      Success: true,
      Message: "Project member added successfully",
    });
  } catch (error) {
    console.log("\n ---------Db Error Logs ------------\n ")
    console.log("Add Project Member Error:", error);
    console.log("\n ---------Db Error End ------------\n ")
    return res.status(500).json({
      Success: false,
      Message: "Failed to add project member",
    });
  }
};
