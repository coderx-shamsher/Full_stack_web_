import pool from "../../Config/mysql.pool.js";

export const getProjectTasksQuery = async (projectId, limit, offset,page, res) => {
  try {
    // const [result] = await pool.query(
    //   `SELECT *
    //  FROM tasks
    //  WHERE project_id = ?`,
    //   [projectId],
    // );
    const [tasks] = await pool.query(
      `SELECT *
     FROM tasks
     WHERE project_id = ?
     order by created_at DESC, taskId DESC
     LIMIT ? OFFSET ?
     `,
      [projectId, limit, offset],
    );

    // -->> Count total project tasks Query ->

    const [countOFTasks] = await pool.query(
      `SELECT COUNT(*) AS total
         FROM tasks
         WHERE project_id = ?`,
      [projectId],
    );

    console.log();
    console.log("\n --------DB Query Fetch L0gs  ---------\n");
    console.log(" \n Total Count OF ProjectTasks -> ", countOFTasks[0].total);
    console.log();
    console.log("Fetch Tasked : ", tasks);
    console.log("\n --------DB Query Fetch L0gs End ---------\n");

    // this is all tasks get response ! 
    // return res.status(200).json({
    //   success: true,
    //   tasks: result,
    // });
   
    // modifyed !! ->>  
    const total = countOFTasks[0].total
    return res.status(200).json({
            success: true,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            data: tasks
        });


  } catch (error) {
    console.log("\n -------- DB Error in Tasks Fetch --------\n");
    console.error("Get Project Tasks Error:", error);
    console.log("\n -------- DB Error in End --------\n");
    return res.status(500).json({
      success: false,
      message: "Internal server error | Tasks Not Fetched ... ",
    });

  }
};

// export 
async function countProjectTasksQuery(projectId) {
  const [result] = await pool.query(
    `SELECT COUNT(*) AS total
         FROM tasks
         WHERE project_id = ?`,
    [projectId],
  );

  // console.log(result[0].total);
  console.log(" \n Total Count OF ProjectTasks -> ", result[0]);
  console.log();
}
