import pool from "../Config/mysql.pool.js";

export const addProjectMemberQuery = async (projectId, memberId, role,res,next) => {
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
      error.context = {
      controller: 'AddProjectMember.Controller.js',
      file: "AddProjectMember.Query.js",
      function: "addProjectMemberQuery ()",
      operation: "project memeber Insertion Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
};
