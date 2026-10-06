import { updateProjectQuery } from "../Database/Queries/UpdateProject.query.js";

export async function UpdateProjectController(req, res) {
  try {
    const userId = req.User.userId;
    const projectId = req.params.projectId;

    const { projectName, description, projectStatus } = req.body;

    console.log("User ID:", userId);
    console.log("Project ID:", projectId);

    const result = await updateProjectQuery(
      projectId,
      projectName,
      description,
      projectStatus,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Success: false,
        Message: "Project not found",
      });
    }

    return res.status(200).json({
      Success: true,
      Message: "Project updated successfully",
      UpdatedProject: result[0]
    });
    
  } catch (error) {
    console.log("Update Project Error:", error);

    return res.status(500).json({
      Success: false,
      Message: "Failed to update project",
    });
  }
}
