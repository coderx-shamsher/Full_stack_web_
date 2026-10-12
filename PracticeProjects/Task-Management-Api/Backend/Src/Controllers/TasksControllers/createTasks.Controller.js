import { CreateTaskService } from "../../Services/createTasks.service.js";

export const createTaskController = async (req, res, next) => {
  const projectId = req.params.projectId;

  // owner of project
  const createdBy = req.User.userId;

  const { assigned_to, title, description, status, priority, due_date } =
    req.body;

  console.log("------ ProjectId ---> ", projectId);
  console.log();
  console.log("------ CreatedBy (userId) ---> ", createdBy);
  console.log();
  
  
  // Basic validation
 if (!projectId || !title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Project ID and task title are required",
    });
  }

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Task Status is required",
    });
  }

  if (!priority) {
    return res.status(400).json({
      success: false,
      message: "Task priority is required",
    });

  }

  if (priority && !["low", "medium", "high", "urgent"].includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority",
       "->" : ["low", "medium", "high", "urgent"]
    });
  }

  if (status && !["todo", "in_progress", "completed"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task status",
      "->": ["todo", "in_progress", "completed"]
    });
  }

  // Continue with your existing query...

  // create task Services
  CreateTaskService({
    projectId,
    assignedTo: assigned_to,
    createdBy,
    title,
    description,
    status,
    priority,
    dueDate: due_date,
    res,
    next,
  });
};
