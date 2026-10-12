import { checkExistProjectMemberQuery } from "../Database/Queries/checkExistProjectMember.Query.js";
import { checkExistProjectMemberForDeleteQuery } from "../Database/Queries/checkExistProjectMemberForDelete.Query.js";
import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { deleteProjectMemberQuery } from "../Database/Queries/deleteProjectMember.Query.js";

export function deleteProjectMemberController(req, res, next) {
  const ownerId = req.User.userId;
  const projectId = req.params.projectId;
  const memberId = req.params.memberId;

  //
  console.log("\n-------Request Data Logs ------- \n");
  console.log("Owner Id : ", ownerId);
  console.log("Project Id : ", projectId);
  console.log("Member Id : ", memberId);
  console.log("\n-------Request Data Logs End------- \n");

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

  /// ------->
  /// project ownership checkout ->
  /// ------->
  checkProjectOwnerQuery(projectId, ownerId, res);

  /// ->>
  //  ------ checkprojectexisting member ->
  checkExistProjectMemberForDeleteQuery(projectId, memberId, res);

  // ->>
  // ------- delele project member query
  deleteProjectMemberQuery(projectId, memberId, res, next);
}
