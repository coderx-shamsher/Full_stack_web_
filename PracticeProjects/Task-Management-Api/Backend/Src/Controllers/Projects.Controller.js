import { CreateProjectsQuery } from "../Database/Queries/projects.query.js";
import { CreateProjectService } from "../Services/CreateProject.service.js";

export const projecCreateController = (req, res,next) => {
  const { projectName, description, projectStatus } = req.body;
  const ownerId = req.User.userId;
 

  // validation checks  
  if(!projectName){
    return res.status(403).json({
      Success : false,
      Message : "ProjectName Needed !!"  
    })
  }

  if(!description){
    return res.status(403).json({
      Success : false,
      Message : "desciption Needed !!"  
    })
  }

  if(!projectStatus){
    return res.status(403).json({
      Success : false,
      Message : "projectStatus Needed !!",
      "->" : "'onGoing','completed','canceled'"
    })
  }

  if(typeof projectName !== "string"){
    return res.status(403).json({
      Success : false,
      Message : "ProjectName Type Invalid !!"  
    })
  }

  if(typeof description !== "string"){
    return res.status(403).json({
      Success : false,
      Message : "description Type Invalid !!"  
    })
  }
 
  if(typeof projectStatus !== "string"){
    return res.status(403).json({
      Success : false,
      Message : "projectStatus Type Invalid !!"  
    })
  }

  // console.log(req.body)
  console.log("\n ------- Request Body-----------\n");
  console.log("Project data ->  \n");
  console.log({
    ownerId,
    projectName,
    description,
    projectStatus,
  });
  console.log("\n ------- Request End -----------\n");

  // calling service function
  CreateProjectService(ownerId, projectName, description, projectStatus, res,next)

};
