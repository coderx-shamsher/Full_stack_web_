import pool from "../../Config/mysql.pool.js";

export const checkProjectExistsQuery = async (projectId, ownerId, res) => {
  try {
    const [projects] = await pool.query(
      `SELECT * FROM projects WHERE projectId = ? and ownerId =? `,
      [projectId, ownerId],
    );

    if (projects.length > 0) {
      console.log();
      console.log("\n ----- Project Exists L0gs ------- \n");
      console.log("Project Exists --> : \n", projects);
      console.log("\n ----- Project Exists L0gs End ------- \n");
    }

    if (projects.length === 0) {
      console.log("\n------ Project Not Exists ------\n")
      console.log(projects)
      console.log("\n--------Project Logs End ------\n")
      console.log()
      return res.status(404).json({
        Message: "Project Not Founded",
        Success: false,
      });
    }

  } catch (error) {
    console.log("\n------- DB Error Logs ----------\n");
    console.log("Project Fetching DB Error : \n", error);
    console.log("\n------- DB Error Logs End -------\n");
    // return res.status(500).json({
    //   Message: "Server Error !!! ",
    // });
  }
};
