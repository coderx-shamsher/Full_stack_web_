import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { addprojectMemberController } from "../Controllers/AddprojectMember.Controller.js";

const projectMembersRouter = express.Router();

//  /api/projects/projectId/members
projectMembersRouter.post(
  "/projects/:projectId/members",
  auth_middleware,
  addprojectMemberController
);

export default projectMembersRouter;
