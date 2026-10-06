import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";
import { addprojectMemberController } from "../Controllers/AddprojectMember.Controller.js";
import { getProjectMembersController } from "../Controllers/getProjectMembers.Controller.js";
import { updateProjectMemberController } from "../Controllers/UpdateProjectMember.Controller.js";


const projectMembersRouter = express.Router();

//  /api/projects/projectId/members
projectMembersRouter.post(
  "/projects/:projectId/members",
  auth_middleware,
  addprojectMemberController
);

projectMembersRouter.get(
    '/projects/:projectId/members',
    auth_middleware,
    getProjectMembersController
);


projectMembersRouter.put(
    '/projects/:projectId/members/:memberId',
    auth_middleware,
    updateProjectMemberController
);

export default projectMembersRouter;
