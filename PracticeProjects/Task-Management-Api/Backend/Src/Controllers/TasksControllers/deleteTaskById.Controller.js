import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkTaskByIdQuery } from "../../Database/Queries/Tasks/checkTaskbyId.Query.js";
import { deleteTaskByIdQuery } from "../../Database/Queries/Tasks/deleteTaskById.Query.js";

export const deleteTaskByidController = (req,res) => {       
         // request data verify 

    const projectId = req.params.projectId
    const taskId = req.params.taskId 
    const projectOwnerid = req.User.userId 

    console.log("projectId : -> ",projectId)
    console.log("TaskId : -> ",taskId)
    console.log("ProjectOwnerId : -> ",projectOwnerid)
    console.log()

     // 1st check -> 
     // project owner/member 
     checkProjectOwnerMemberQuery(projectId,projectOwnerid,res)
      

    // 2nd check ->  
      // for project exists
      checkProjectExistsQuery(projectId,projectOwnerid,res)

    
    // 3rd check -> 
      // for task exist and task belongs to project 
     checkTaskByIdQuery(taskId,projectId,res)

    
    // 4th delete query function 
     deleteTaskByIdQuery(taskId,res)
}                             

