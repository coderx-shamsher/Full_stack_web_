import { deleteProjectQuery } from "../Database/Queries/deleteProject.Query.js";

export function deleteProjectController(req, res) {
  const projectId = req.params.projectId;
  const ownerId = req.User.userId 
  console.log("\n ProjectID User Requested !! -> ",projectId)
  console.log("\n OwnerID From jwt !! -> ",ownerId)

  // db call (delete project function ->)
  deleteProjectQuery(projectId,ownerId, res);
}
