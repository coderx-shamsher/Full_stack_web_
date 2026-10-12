import { checkProjectMemberForUpdateQuery } from "../Database/Queries/CheckProjectMemberForUpdate.query.js";
import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { updateProjectMemberQuery } from "../Database/Queries/updateProjectMemberQuery.js";

export const updateProjectMemberController = async (req, res, next) => {
  const ownerId = req.User.userId;
  const projectId = req.params.projectId;
  const memberId = req.params.memberId;
  const { role } = req.body;

  // ----------------------
  // verify role needed , jise update krna hai vo toh hona chaahie...
  // ----------------------
  console.log("ownerId : ", ownerId);
  console.log("projectId : ", projectId);
  console.log("memberId : ", memberId);

  if (!projectId) {
    return res.status(403).json({
      Success: false,
      Message: "projectid Needed !!",
    });
  }

  if (typeof projectId !== "number") {
    return res.status(403).json({
      Success: false,
      Message: "projectid type invalid !!",
    });
  }

  if (!memberId) {
    return res.status(403).json({
      Success: false,
      Message: "memberId Needed !!",
    });
  }

  if (typeof memberId !== "number") {
    return res.status(403).json({
      Success: false,
      Message: "memberId type invalid !!",
    });
  }

  if (!role) {
    return res.status(400).json({
      Success: false,
      Message: "Role is required",
    });
  }

  if (typeof role !== "string") {
    return res.status(400).json({
      Success: false,
      Message: "Role Type ",
    });
  }



  // ----------------------
  // check project owner query function
  // ----------------------
  checkProjectOwnerQuery(projectId, ownerId, res);

  // ----------------------
  // check project existing  member  owner query function
  // ----------------------
  // checkExistProjectMemberQuery(projectId, memberId, res);
  checkProjectMemberForUpdateQuery(projectId, memberId, res);

  // ----------------------
  // Update project member query function
  // ----------------------
  updateProjectMemberQuery(projectId, memberId, role, res, next);
};
