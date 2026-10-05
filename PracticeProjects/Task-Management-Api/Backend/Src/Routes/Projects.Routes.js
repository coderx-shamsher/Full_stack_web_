import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { CreateProjectService } from "../Services/CreateProject.service.js";
import { projecCreateController } from "../Controllers/Projects.Controller.js";

const projectsRouter = express.Router();

projectsRouter.post("/projects", auth_middleware, projecCreateController);

export default projectsRouter;
