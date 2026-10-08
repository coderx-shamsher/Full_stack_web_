import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { TaskExistsQuery } from "../../Database/Queries/Tasks/TaskExists.Query.js";

export function getTasksByIdController(req, res) {
  console.log("\nProject Owner -> ", req.User.userId);
  console.log("\nProjectId -> ", req.params.projectId);
  console.log("\nTaskID    -> ", req.params.taskId);

  //
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const projectOwnerId = req.User.userId;

  // -->>> check for projectid (project exists krta hai k nhi )
  checkProjectExistsQuery(projectId, projectOwnerId, res);

  // check for OwnerShip and Membership
  checkProjectOwnerMemberQuery(projectId, projectOwnerId, res);

  // check for task exists or not and task belongs to that project or not at same time
  TaskExistsQuery(taskId, projectId, res);
}
