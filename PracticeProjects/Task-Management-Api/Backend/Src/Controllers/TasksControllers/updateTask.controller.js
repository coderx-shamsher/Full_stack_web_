import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { updateTaskQuery } from "../../Database/Queries/Tasks/UpdateTasks.Query.js";
import { checkTaskByIdQuery } from "../../Database/Queries/Tasks/checkTaskbyId.Query.js";

export  function updateTaskController(req, res,next) {
  // console.log(req.body)

  // first project id
  const projectId = Number(req.params.projectId)

  const projectOwnerId = req.User.userId;

  const taskId =  Number(req.params.taskId)

  // confirm log ->
  console.log("ProjectID -> ", projectId);
  console.log("ProjectOwnerID -> ", projectOwnerId);
  console.log("TaskID   -> ", taskId);
  console.log();
  console.log("\n---<< Request data : ",req.body,"---->>---\n");
  console.log()


  // parameter checks 
  if(!projectId) { 
    return res.status(403).json({
      Success : false,
      Message : "Project Id Needed !!"
    })
  }
  if(!taskId) { 
    return res.status(403).json({
      Success : false,
      Message : "Project Id Needed !!"
    })
  }

  if(typeof projectId !== "number"){
     return res.status(403).json({
      Success : false,
      Message : "ProjectId Type is Invalid  !!"
    })
  }
  
  if(typeof taskId !== "number"){
     return res.status(403).json({
      Success : false,
      Message : "ProjectId Type is Invalid  !!"
    })
  }


 // ->> fields validation checks 
  
 // validate data
    const { title, description, status, priority, due_date, assigned_to } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Task description is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Task status is required",
        "-> " : ["todo", "in_progress", "completed"]
      });
    }
    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Task priority is required",
        "-> " : ["low", "medium", "high", "urgent"]
      });
    }

    if (!due_date) {
      return res.status(400).json({
        success: false,
        message: "Task due_date is required",
      });
    }
    if (!assigned_to) {
      return res.status(400).json({
        success: false,
        message: "Task assign_to  is required",
      });
    }


  // first check ->
  // project owner or project member
  checkProjectOwnerMemberQuery(projectId, projectOwnerId, res);
  
  
  // second check ->
  // project exists or not
  checkProjectExistsQuery(projectId, projectOwnerId, res);


  // third check ->
  // Task Exists + belongs to Project?
   checkTaskByIdQuery(taskId,projectId,res)
  
  // 4th update task Query
   updateTaskQuery(res,taskId,projectId)
}
