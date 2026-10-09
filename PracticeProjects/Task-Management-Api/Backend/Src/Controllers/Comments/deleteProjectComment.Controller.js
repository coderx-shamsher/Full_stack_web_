import { checkProjectCommentExistsQuery } from "../../Database/Queries/comments/ProjectCommentExistsQuery.js";
import { deleteProjectCommentQuery } from "../../Database/Queries/comments/deleteprojectcomment.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";

export function deleteProjectCommentController(req, res) {
  const projectId = Number(req.params.projectId);
  const commentId = Number(req.params.commentId);
  const userId = req.User.userId;

  console.log("-->> projectId : ", projectId);
  console.log("-->> commentId : ", commentId);
  console.log("-->> userId : ", userId);

  console.log();

  // -->> validation checks
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

  // project access check ->
  checkProjectOwnerMemberQuery(projectId, userId, res);

  // project exist check ->
  checkProjectExistsQuery(projectId, userId, res);

  // check for comment exist
  checkProjectCommentExistsQuery(commentId, projectId, res);

  /// final delete query
  deleteProjectCommentQuery(projectId, commentId, userId, res);
}
