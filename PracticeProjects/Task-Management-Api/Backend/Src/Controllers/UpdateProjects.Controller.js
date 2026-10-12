import { updateProjectQuery } from "../Database/Queries/UpdateProject.query.js";

export async function UpdateProjectController(req, res, next) {
  const userId = req.User.userId;
  const projectId = req.params.projectId;

  const { projectName, description, projectStatus } = req.body;

  console.log("User ID:", userId);
  console.log("Project ID:", projectId);

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

  // validation checks
  if (!projectName) {
    return res.status(403).json({
      Success: false,
      Message: "ProjectName Needed !!",
    });
  }

  if (!description) {
    return res.status(403).json({
      Success: false,
      Message: "desciption Needed !!",
    });
  }

  if (!projectStatus) {
    return res.status(403).json({
      Success: false,
      Message: "projectStatus Needed !!",
      "->": "'onGoing','completed','canceled'",
    });
  }

  if (typeof projectName !== "string") {
    return res.status(403).json({
      Success: false,
      Message: "ProjectName Type Invalid !!",
    });
  }

  if (typeof description !== "string") {
    return res.status(403).json({
      Success: false,
      Message: "description Type Invalid !!",
    });
  }

  if (typeof projectStatus !== "string") {
    return res.status(403).json({
      Success: false,
      Message: "projectStatus Type Invalid !!",
    });
  }

  // db call (update project func !!)
  updateProjectQuery(
    projectId,
    projectName,
    description,
    projectStatus,
    userId,
    res,
    next,
  );
  
}
