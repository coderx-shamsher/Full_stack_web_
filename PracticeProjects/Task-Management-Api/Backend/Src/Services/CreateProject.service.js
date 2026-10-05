import { CreateProjectsQuery } from "../Database/Queries/projects.query.js";

export function CreateProjectService( ownerId,
    projectName,
    description,
    projectStatus,res) {
    
   // insert opertion in db 
   CreateProjectsQuery( ownerId,
    projectName,
    description,
    projectStatus,res)
   
   
}