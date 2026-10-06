import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { getProjectMembersQuery } from "../Database/Queries/GetProjectMembers.Query.js";

export const getProjectMembersController = (req, res) => {
  const ownerId = req.User.userId;
  const projectId = req.params.projectId;

  // ----------------------
  //  check prject ownership
  // ----------------------
  checkProjectOwnerQuery(projectId, ownerId, res);

  // --------------------------
  // get all members
  // --------------------------

  getProjectMembersQuery(projectId, res);
};
