import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { updateTaskQuery } from "../../Database/Queries/Tasks/UpdateTasks.Query.js";
import { checkTaskByIdQuery } from "../../Database/Queries/Tasks/checkTaskbyId.Query.js";

export  function updateTaskController(req, res) {
  // console.log(req.body)

  // first project id
  const projectId = req.params.projectId;

  const projectOwnerId = req.User.userId;

  const taskId = req.params.taskId;

  // confirm log ->
  console.log("ProjectID -> ", projectId);
  console.log("ProjectOwnerID -> ", projectOwnerId);
  console.log("TaskID   -> ", taskId);
  console.log();

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
   updateTaskQuery(req,res,taskId,projectId)
}
