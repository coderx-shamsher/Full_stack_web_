import { checkProjectExistsQuery } from '../../Database/Queries/Tasks/checProjectExistsById.Query.js';
import { checkProjectOwnerMemberQuery } from '../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js';
import { InsertProjectCommentQuery } from '../../Database/Queries/comments/InsertProjectComment.Query.js';

export const InsertProjectCommentController = (req, res) => {
  const projectId = Number(req.params.projectId);
  const userId = req.User.userId;
  const { comment } = req.body;

  // let check log
  console.log("projectId ->", projectId);
  console.log("UserId -> ", userId);
  console.log("Comment  -> ", comment);
  console.log();

  // validate  ->>
  if (typeof projectId !== "number" && projectId < 0) {
    return res.status(404).json({
      Success: false,
      Message: "Invaild projectId !! try again...",
    });
  }

  if (!comment) {
    return res.status(404).json({
      Success: false,
      Message: "Comment Needed !...",
    });
  }

  if (typeof comment !== "string") {
    return res.status(404).json({
      Success: false,
      Message: "Invaild Comment !!... only string ",
    });
  }

  // check for project exist
  checkProjectExistsQuery(projectId, userId, res);

  // check project owner member Query
  checkProjectOwnerMemberQuery(projectId, userId, res);

  InsertProjectCommentQuery(projectId, userId, comment, res);
};
