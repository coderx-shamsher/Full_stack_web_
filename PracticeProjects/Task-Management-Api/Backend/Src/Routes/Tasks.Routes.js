import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { createTaskController } from "../Controllers/TasksControllers/createTasks.Controller.js";
import { getAllProjectTasksController } from "../Controllers/TasksControllers/getProjectTasks.Controller.js";
import { getTasksByIdController } from "../Controllers/TasksControllers/getTaskById.Controller.js";
import { updateTaskController } from "../Controllers/TasksControllers/updateTask.controller.js";
import { checkProjectOwnerMemberQuery } from "../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkTaskByIdQuery } from "../Database/Queries/Tasks/checkTaskbyId.Query.js";
import { deleteTaskByIdQuery } from "../Database/Queries/Tasks/deleteTaskById.Query.js";


const tasksRouter = express.Router();

tasksRouter.post(
  "/projects/:projectId/tasks",
  auth_middleware,
  createTaskController,
);

tasksRouter.get(
  "/projects/:projectId/tasks",
  auth_middleware,
  getAllProjectTasksController,
);

tasksRouter.get(
  "/projects/:projectId/tasks/:taskId",
  auth_middleware,
  getTasksByIdController
);

tasksRouter.put(
  "/projects/:projectId/tasks/:taskId",
  auth_middleware, 
  updateTaskController
);

tasksRouter.delete(
  "/projects/:projectId/tasks/:taskId",
  auth_middleware,
  (req,res)=>{
     
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
)

export default tasksRouter;
