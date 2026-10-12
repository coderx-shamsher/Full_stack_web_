import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkTaskByIdQuery } from "../../Database/Queries/Tasks/checkTaskbyId.Query.js";
import { deleteTaskByIdQuery } from "../../Database/Queries/Tasks/deleteTaskById.Query.js";

export const deleteTaskByidController = (req, res, next) => {
  // request data verify

 const projectId = Number(req.params.projectId)

  const projectOwnerid = req.User.userId;

  const taskId =  Number(req.params.taskId)

  console.log("projectId : -> ", projectId);
  console.log("TaskId : -> ", taskId);
  console.log("ProjectOwnerId : -> ", projectOwnerid);
  console.log();

  // parameter checks
  if (!projectId) {
    return res.status(403).json({
      Success: false,
      Message: "Project Id Needed !!",
    });
  }
  if (!taskId) {
    return res.status(403).json({
      Success: false,
      Message: "Project Id Needed !!",
    });
  }

  if (typeof projectId !== "number") {
    return res.status(403).json({
      Success: false,
      Message: "ProjectId Type is Invalid  !!",
    });
  }

  if (typeof taskId !== "number") {
    return res.status(403).json({
      Success: false,
      Message: "ProjectId Type is Invalid  !!",
    });
  }

  // 1st check ->
  // project owner/member
  checkProjectOwnerMemberQuery(projectId, projectOwnerid, res);

  // 2nd check ->
  // for project exists
  checkProjectExistsQuery(projectId, projectOwnerid, res);

  // 3rd check ->
  // for task exist and task belongs to project
  checkTaskByIdQuery(taskId, projectId, res);

  // 4th delete query function
  deleteTaskByIdQuery(taskId, res, next);
};
