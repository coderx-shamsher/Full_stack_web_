import pool from "../../Config/mysql.pool.js";

export const getProjectTasksQuery = async (
  projectId,
  limit,
  offset,
  page,
  res,
  filter = {},
   sortColumn = "created_at",
  sortOrder = "DESC",
) => {
try {
    // Step 1: Build filter conditions
    let filterQuery = "";
    const filterValues = [];

    if (filter.status) {
      filterQuery += ` AND status = ?`;
      filterValues.push(filter.status);
    }

    if (filter.priority) {
      filterQuery += ` AND priority = ?`;
      filterValues.push(filter.priority);
    }

    // Step 2: Fetch tasks with filters + pagination
    // const [tasks] = await pool.query(
    //   `SELECT *
    //    FROM tasks
    //    WHERE project_id = ? ${filterQuery}
    //    ORDER BY created_at DESC, taskId DESC
    //    LIMIT ? OFFSET ?`,
    //   [projectId, ...filterValues, limit, offset],
    // );

   /// updated _>> sorting + filter + pagination query 
    const [tasks] = await pool.query(
      `SELECT *
       FROM tasks
       WHERE project_id = ? ${filterQuery}
       ORDER BY ${sortColumn} ${sortOrder}, taskId DESC
       LIMIT ? OFFSET ?`,
      [projectId, ...filterValues, limit, offset],
    );

    // Step 3: Count tasks using the SAME filters
    const [countOFTasks] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM tasks
       WHERE project_id = ? ${filterQuery}`,
      [projectId, ...filterValues],
    );

    // Step 4: Get total count
    const total = countOFTasks[0].total;

    // Step 5: Debug logs
    console.log(
      "\n-------- DB Query Fetch Logs --------\n",
    );

    console.log("Project ID:", projectId);
    console.log("Applied Filters:", filter);
    console.log("Total Matching Tasks:", total);
    console.log("Fetched Tasks:", tasks);

    console.log(
      "\n-------- DB Query Fetch Logs End --------\n",
    );

    // Step 6: Send response
    return res.status(200).json({
      success: true,
      pagination: {
        totalTasks:total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: tasks,
    });


  } catch (error) {
    console.log("\n-------- DB Error in Tasks Fetch --------\n");
    console.error("Get Project Tasks Error:", error);
    console.log("\n-------- DB Error in End --------\n");

    return res.status(500).json({
      success: false,
      message: "Internal server error | Tasks Not Fetched ...",
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
