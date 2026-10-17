import { deleteProjectQuery } from "../Database/Queries/deleteProject.Query.js";

export function deleteProjectController(req, res, next) {
  const projectId = Number(req.params.projectId)
  const ownerId = req.User.userId;
  console.log("\n ProjectID User Requested !! -> ", projectId);
  console.log("\n OwnerID From jwt !! -> ", ownerId);

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

  // db call (delete project function ->)
  deleteProjectQuery(projectId, ownerId, res, next);
}
