import pool from "../Config/mysql.pool.js";

export async function CreateProjectsQuery(
  ownerId,
  projectName,
  description,
  projectStatus,
  res,
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
    console.log("\n --------- Error >>-------- \n");
    console.log(error, "\n");
    console.log("\n --------- Error  End <<-------- \n");
    return res.status(500).json({
      success: false,
      message: "Project Creation failed..",
    });
  }
}
