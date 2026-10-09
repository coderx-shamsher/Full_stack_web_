import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js';
import { InsertProjectCommentController } from '../Controllers/Comments/AddProjectComments.Controller.js';
import { getprojectCommentsController } from '../Controllers/Comments/getProjectComments.Controller.js';
import { checkProjectOwnerMemberQuery } from '../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js';
import { checkProjectExistsQuery } from '../Database/Queries/Tasks/checProjectExistsById.Query.js';
import { checkprojectCommentExists } from '../Database/Queries/comments/checkprojectCommentExists.Query.js';
import { updateprojectCommentQuery } from '../Database/Queries/comments/updateProjectComment.Query.js';


                              
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

commentsRouter.put(
    '/projects/:projectId/comments/:commentId',
    auth_middleware,
    
)
export default  commentsRouter            