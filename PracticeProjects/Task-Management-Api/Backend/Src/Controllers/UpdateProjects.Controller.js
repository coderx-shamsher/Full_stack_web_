import { updateProjectQuery } from "../Database/Queries/UpdateProject.query.js";

export async function UpdateProjectController(req, res) {
  const userId = req.User.userId;
  const projectId = req.params.projectId;

  const { projectName, description, projectStatus } = req.body;

  console.log("User ID:", userId);
  console.log("Project ID:", projectId);

  // db call (update project func !!)
  updateProjectQuery(
    projectId,
    projectName,
    description,
    projectStatus,
    userId,
    res,
  );

}
