import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js';
import { InsertProjectCommentController } from '../Controllers/Comments/AddProjectComments.Controller.js';
import { getprojectCommentsController } from '../Controllers/Comments/getProjectComments.Controller.js';


                              
const commentsRouter  =  express.Router()

commentsRouter.post(
    "/projects/:projectId/comments",
    auth_middleware,
    InsertProjectCommentController
);

commentsRouter.get(
    '/projects/:projectId/comments',
    auth_middleware,
    getprojectCommentsController
);
export default  commentsRouter            