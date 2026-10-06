import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { projecCreateController } from "../Controllers/Projects.Controller.js";
import { getProjectsController } from "../Controllers/GetProjects.Controller.js";
import { GetProjectsByIdController } from "../Controllers/GetProjectById.controller.js";
import { UpdateProjectController } from "../Controllers/UpdateProjects.Controller.js";
import { deleteProjectController } from "../Controllers/DeleteProject.Controller.js";

const projectsRouter = express.Router();

projectsRouter.post(
    "/projects", 
    auth_middleware, 
    projecCreateController); // create or new project by user

projectsRouter.get(
    "/projects",
     auth_middleware, 
    getProjectsController); // /api/project -> to get project

projectsRouter.get(
  "/projects/:projectId",
  auth_middleware,
  GetProjectsByIdController,
); // /api/project/:projectid  -> to get project by id

// /api/projects/:projectid
projectsRouter.put(
    "/projects/:projectId",
    auth_middleware,
    UpdateProjectController
); // update project by projectid 

projectsRouter.delete(
    "/projects/:projectId",
    auth_middleware,
    deleteProjectController
);

export default projectsRouter;
