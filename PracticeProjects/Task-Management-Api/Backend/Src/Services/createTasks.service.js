import { getProjectsQuery } from "../Database/Queries/GetProjects.query.js";
import { createTaskQuery } from "../Database/Queries/Tasks/createTask.Query.js";

export const CreateTaskService = ({
  projectId,
  assignedTo,
  createdBy,
  title,
  description,
  status,
  priority,
  dueDate,res
}) => {
  
  getProjectsQuery

  // Create task query function 
  createTaskQuery(
    projectId,
    assignedTo,
    createdBy,
    title,
    description,
    status,
    priority,
    dueDate,res
  );


};