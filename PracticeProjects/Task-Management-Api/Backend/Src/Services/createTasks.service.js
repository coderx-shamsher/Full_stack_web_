import { checkUserExistsQuery } from "../Database/Queries/CheckUserExists.Query.js";
import { getProjectsQuery } from "../Database/Queries/GetProjects.query.js";
import { checkProjectOwnerMemberQuery } from "../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { createTaskQuery } from "../Database/Queries/Tasks/createTask.Query.js";

export const CreateTaskService = ({
  projectId,
  assignedTo,
  createdBy,
  title,
  description,
  status,
  priority,
  dueDate,
  res,
}) => {
  // validate project exists bhi krta hai k nhi with project id
  // check project exits
  // passing createdby as ownerid
  checkProjectExistsQuery(projectId, createdBy, res);

  // member check
  checkProjectOwnerMemberQuery(projectId, createdBy, res);

  // check assign to user is exists or not
  checkUserExistsQuery(assignedTo, res);

  // Create task query function
  createTaskQuery(
    projectId,
    assignedTo,
    createdBy,
    title,
    description,
    status,
    priority,
    dueDate,
    res,
  );
  
};
