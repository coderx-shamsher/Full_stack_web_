import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { getProjectMembersQuery } from "../Database/Queries/GetProjectMembers.Query.js";

export const getProjectMembersController = (req, res, next) => {
  const ownerId = req.User.userId;
  const projectId = Number(req.params.projectId)

  if (!projectId) {
    return res.status(403).json({
      Success: false,
      Message: "projectid Needed !!",
    });
  }

  if (typeof projectId !== "number") {
    return res.status(403).json({
      Success: false,
      Message: "projectid Type invalid !!",
    });
  }

  // ----------------------
  //  check prject ownership
  // ----------------------
  checkProjectOwnerQuery(projectId, ownerId, res);

  // --------------------------
  // get all members
  // --------------------------

  getProjectMembersQuery(projectId, res, next);
};
