import pool from "../Config/mysql.pool.js";

export async function CreateProjectsQuery(
  ownerId,
  projectName,
  description,
  projectStatus,
  res,next
) {
  try {
    const [project] = await pool.query(
      `INSERT INTO projects
    (ownerId, projectName, description, projectStatus)
    VALUES (?, ?, ?, ?)`,
      [ownerId, projectName, description, projectStatus],
    );

    console.log("\n --------- Db Query Result >-------- \n");
    console.log(project, "\n");
    console.log("\n --------- Db Query End <-------- \n");
    return res.status(200).json({
      success: true,
      message: "Project Created Successfull",
      projectId : project.insertId
    });
    //   return {
    //     success: true,
    //     message: "Project Created Successfull",
    //   }
  } catch (error) {
     error.context = {
      controller: 'Projects.Controller.js',
      file: "projects.query.js",
      function: "CreateProjectsQuery ()",
      operation: "Project Creation Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
}
