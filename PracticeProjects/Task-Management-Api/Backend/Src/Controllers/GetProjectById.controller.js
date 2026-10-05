import { getProjectByIdQuery } from "../Database/Queries/GetProjectsById.Query.js";

export const GetProjectsByIdController = async (req, res) => {
    try {
      // User identity from JWT
      const userId = req.User.userId;

      // Project ID from URL
      const projectId = req.params.projectId;
      console.log("\n ------>> User Request logs --------- \n");
      console.log("JWT User ID:", userId);
      console.log();
      console.log("Requested Project ID:", projectId);
      console.log("\n ------>> User Requst logs end --------- \n");

   
     // db opertions ->>> 
      const project = await getProjectByIdQuery(projectId);
      if (project.length === 0) {
        return res.status(404).json({
          Success: false,
          Message: "Project not found",
        });
      }
      
      return res.status(200).json({
        Success: true,
        Project: project[0],
      });
    } catch (error) {
      console.log("Get Project Error:", error);

      return res.status(500).json({
        Success: false,
        Message: "Failed to fetch project",
      });
    }
  }