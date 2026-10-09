import { checkProjectCommentExistsQuery } from "../../Database/Queries/comments/ProjectCommentExistsQuery.js";
import { updateprojectCommentQuery } from "../../Database/Queries/comments/updateProjectComment.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";

export const updateprojectCommentController = async (req, res) => {
  const projectId = Number(req.params.projectId);
  const commentId = Number(req.params.commentId);
  const userId = req.User.userId;
  const { comment } = req.body;

  console.log("-->> projectId : ", projectId);
  console.log("-->> commentId : ", commentId);
  console.log("-->> userId : ", userId);
  console.log("-->> comment : ", comment);
  console.log();

  // basic validation checks --->
  if (typeof projectId !== "number" || projectId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  if (typeof commentId !== "number" || commentId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid comment ID",
    });
  }

  if (typeof comment !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid comment type (only string values) !!",
    });
  }

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: "Comment content Needed !! try again!!",
    });
  }

  // project access checks
  checkProjectOwnerMemberQuery(projectId, userId, res);
   
  // project exists checks
  checkProjectExistsQuery(projectId, userId, res);
  
  // check for comment exists
  checkProjectCommentExistsQuery(commentId, projectId, res)

  // update comment query ->
  updateprojectCommentQuery(commentId, projectId, comment, res);

  
};
