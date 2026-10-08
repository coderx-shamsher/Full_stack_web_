import { CreateTaskService } from "../../Services/createTasks.service.js";

export const createTaskController = async (req, res) => {

    const projectId = req.params.projectId;
 
    // owner of project 
    const createdBy = req.User.userId;

    const { assigned_to, title, description, status, priority, due_date } =
      req.body;
 

    console.log("------ ProjectId ---> ",projectId)
    console.log() 
    console.log("------ CreatedBy (userId) ---> ",createdBy)
    console.log()

    // Basic validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
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

    // create task Services 
    CreateTaskService({
      projectId,
      assignedTo: assigned_to,
      createdBy,
      title,
      description,
      status,
      priority,
      dueDate: due_date,res
    });

};
