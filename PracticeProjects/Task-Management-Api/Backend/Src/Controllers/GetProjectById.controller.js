import { getProjectByIdQuery } from "../Database/Queries/GetProjectsById.Query.js";


export const GetProjectsByIdController = (req, res, next) => {
    try {
      // User identity from JWT
      const userId = req.User.userId;

      // Project ID from URL
      const projectId = Number(req.params.projectId);
  
      console.log("\n ------>> User Request logs --------- \n");
      console.log("JWT User ID:", userId);
      console.log();
      console.log("Requested Project ID:", projectId, typeof projectId);
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
      getProjectByIdQuery(projectId,userId,res);
   
    
    } catch (error) {
        error.context = {
      controller: "GetProjectById.Controller.js",
      file: "GetProjectById.Controller.js",
      function: "getProjectByIdQuery ()",
      operation: "project by id Fetch Failed !! ",
      layer: "Database Query",
    };
    next(error);
    }
  }