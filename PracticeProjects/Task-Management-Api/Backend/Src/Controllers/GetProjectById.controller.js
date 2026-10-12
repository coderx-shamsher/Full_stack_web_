import { getProjectByIdQuery } from "../Database/Queries/GetProjectsById.Query.js";

export const GetProjectsByIdController = async (req, res, next) => {
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
    
      if(!projectId){
        return res.status(403).json({
          Success : false,
          Message : "projectid Needed !!"
        })
      }
   
      if(typeof projectId !== "number" ){
          return res.status(403).json({
          Success : false,
          Message : "projectid type invalid !!"
        })
      }
   
     // db opertions ->>> 
      const project = await getProjectByIdQuery(projectId,userId);
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
        error.context = {
      controller: "GetProjectById.Controller.js",
      file: "GetProjectsById.Query.js",
      function: "getProjectByIdQuery ()",
      operation: "project by id Fetch Failed !! ",
      layer: "Database Query",
    };
    next(error);
    }
  }