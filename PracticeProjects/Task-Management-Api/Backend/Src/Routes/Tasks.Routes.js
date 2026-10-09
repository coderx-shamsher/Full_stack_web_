import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { createTaskController } from "../Controllers/TasksControllers/createTasks.Controller.js";
import { getAllProjectTasksController } from "../Controllers/TasksControllers/getProjectTasks.Controller.js";
import { getTasksByIdController } from "../Controllers/TasksControllers/getTaskById.Controller.js";
import { updateTaskController } from "../Controllers/TasksControllers/updateTask.controller.js";


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


export default tasksRouter;
