import pool from "../../Config/mysql.pool.js";

export const createTaskQuery = async (
  projectId,
  assignedTo,
  createdBy,
  title,
  description,
  status,
  priority,
  dueDate,
  res,
) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO tasks
    (
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectId,
        assignedTo,
        createdBy,
        title,
        description,
        status,
        priority,
        dueDate,
      ],
    );
    console.log('\n ------ DB Query (CreateTasks) Logs ---------- \n')
    console.log(result)
    console.log('\n ------ DB Query Logs End ---------- \n')
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      taskId: result.insertId,
    });

  } catch (error) {
    console.log("\n ------- DB Error Logs --------\n")
    console.error("Create Task Error:", error);
    console.log("\n ------- DB Error Logs End --------\n")
    return res.status(500).json({
      success: false,
      message: "Internal server error | Failed In Creating Task",
    });
  }
};
