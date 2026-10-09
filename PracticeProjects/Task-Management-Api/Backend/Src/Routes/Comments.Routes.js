import express from "express";
import { auth_middleware } from "../Middlewares/authMiddleware.js";

import { InsertProjectCommentController } from "../Controllers/Comments/AddProjectComments.Controller.js";
import { getprojectCommentsController } from "../Controllers/Comments/getProjectComments.Controller.js";
import { updateprojectCommentController } from "../Controllers/Comments/updateProjectComments.Controller.js";
import { deleteProjectCommentController } from "../Controllers/Comments/deleteProjectComment.Controller.js";


const commentsRouter = express.Router();

commentsRouter.post(
  "/projects/:projectId/comments",
  auth_middleware,
  InsertProjectCommentController,
);

commentsRouter.get(
  "/projects/:projectId/comments",
  auth_middleware,
  getprojectCommentsController,
);

commentsRouter.put(
  "/projects/:projectId/comments/:commentId",
  auth_middleware,
  updateprojectCommentController,
);

commentsRouter.delete(
  "/projects/:projectId/comments/:commentId",
  auth_middleware,
  deleteProjectCommentController
);
export default commentsRouter;
