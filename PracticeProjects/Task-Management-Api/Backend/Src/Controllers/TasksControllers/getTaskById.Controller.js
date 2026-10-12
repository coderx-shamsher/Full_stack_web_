import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { TaskExistsQuery } from "../../Database/Queries/Tasks/TaskExists.Query.js";

export function getTasksByIdController(req, res,next) {
  console.log("\nProject Owner -> ", req.User.userId);
  console.log("\nProjectId -> ", req.params.projectId);
  console.log("\nTaskID    -> ", req.params.taskId);

  //
  const projectId = Number(req.params.projectId);
  const taskId = Number(req.params.taskId);
  const projectOwnerId = req.User.userId;

  // validations 
   if(!projectId){
     return res.status(404).json({
       Success : false ,
       Message : "TaskId Needed !! "
     })
  }

  if(typeof projectId !== "number" ){
     return res.status(404).json({
       Success : false ,
       Message : "Type of projectId is invalid !! "
     })
  }

  if(!taskId){
     return res.status(404).json({
       Success : false ,
       Message : "TaskId Needed !! "
     })
  }

  if(typeof taskId !== "number" ){
     return res.status(404).json({
       Success : false ,
       Message : "Type of TaskId is invalid !! "
     })
  }



  // -->>> check for projectid (project exists krta hai k nhi )
  checkProjectExistsQuery(projectId, projectOwnerId, res);

  // check for OwnerShip and Membership
  checkProjectOwnerMemberQuery(projectId, projectOwnerId, res);

  // check for task exists or not and task belongs to that project or not at same time
  // or ager task hai to use return krna use ko 
  TaskExistsQuery(taskId, projectId, res,next);
}
