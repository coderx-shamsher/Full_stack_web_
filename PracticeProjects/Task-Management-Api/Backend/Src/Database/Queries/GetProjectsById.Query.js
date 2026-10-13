import pool from "../Config/mysql.pool.js";

async function checkOwnerAndMemberQueryfn(projectId, userId, res) {
  
  const [owner] = await pool.query(
    `SELECT *
             FROM projects
           WHERE projectId = ?
           AND ownerId = ?`,
    [projectId, userId],
  );

  if (owner.length === 0) {

    console.log("\n -> owner ", owner, "\n");
    console.log("\n checking if user is member of project ? -----> \n");

    const [member] = await pool.query(
      `SELECT *
             FROM project_members
           WHERE project_id = ?
           AND memberId = ?`,
      [projectId, userId],
    );

    if (member.length > 0) {
      console.log("\n Its Member -> ", member);

      const [result] = await pool.query(
        `SELECT
            p.projectId,
            p.projectName,
            p.description,
            p.projectStatus,
            pm.project_id,
            pm.memberId,
            pm.role
       FROM projects AS p
            INNER JOIN project_members AS pm
            ON p.projectId = pm.project_id
        WHERE p.projectId = ?
        AND pm.memberId = ?`,
        [projectId, userId],
      );

      if (result.length > 0) {
        const {
          projectId,
          projectName,
          description,
          projectStatus,
          memberId,
          role,
        } = result[0];

        return res.status(200).json({
          Success: true,
          "Member & Project Detail": {
            "Role ->": role,
            MemberID: memberId,
            projectId: projectId,
            projectName: projectName,
            projectStatus: projectStatus,
            Description: description,
          },
        });
      }

    }

    // if your are not member -> 
    if(member.length === 0){
       console.log("\n Your are not Member also \n")
       console.log("\n => ",member)

       return res.status(403).json({
        Success : false,
        Message: "You are not Owner && Member Of this project"
       })
    }

  }

  if (owner.length > 0) {
    console.log("\n=====================================\n");
    console.log("Owner ->", owner);
    console.log("\n=====================================\n");
    
      // destructure ->>
      const { projectId, projectName, ownerId, description, projectStatus } =
        owner[0];

    return res.status(200).json({
      Success: true,
      Message: "Here is Your Projects ->",
      projectDetail: {
        projectId,
        projectName,
        ownerId,
        description,
        projectStatus,
      },
    });
  }
}

export const getProjectByIdQuery = async (projectId, ownerId, res) => {
  try {
    
    // calculation function 
    checkOwnerAndMemberQueryfn(projectId, ownerId, res);


  } catch (error) {
     error.context = {
      controller: "GetProjectById.Controller.js",
      file: "GetProjectsById.Query.js",
      function: "checkOwnerAndMemberQueryfn ()",
      operation: "project by id Fetch Failed !! ",
      layer: "Database Query",
    };
    next(error);
  }
};
