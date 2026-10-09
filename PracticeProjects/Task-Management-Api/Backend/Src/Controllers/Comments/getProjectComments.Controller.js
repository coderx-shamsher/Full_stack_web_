import { getprojectcommentsQuery } from "../../Database/Queries/comments/getAllprojectComments.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";

export const getprojectCommentsController = (req, res) => {
  const projectId = Number(req.params.projectId);
  const userId = req.User.userId;

  console.log("\n ---->> projectId", projectId);
  console.log("\n ---->> userId", userId);

  // project Id validation
  if (typeof projectId !== "number" || projectId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  // check for project owner of member
  checkProjectOwnerMemberQuery(projectId, userId, res);

  // -->> get project comments query ->
  getprojectcommentsQuery(projectId, res);
};
