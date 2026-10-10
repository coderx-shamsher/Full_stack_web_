import { checkProjectOwnerMemberQuery } from "../../Database/Queries/Tasks/checkProject_member_OR_owner.Query.js";
import { checkProjectExistsQuery } from "../../Database/Queries/Tasks/checProjectExistsById.Query.js";
import { getProjectTasksQuery } from "../../Database/Queries/Tasks/GetTasks.Query.js";

export const getAllProjectTasksController = (req, res) => {
  const projectId = req.params.projectId;

  const ownerId = req.User.userId;

  console.log("projectId => ", projectId);
  console.log();
  console.log("OwnerId => ", ownerId);

  // Step 2: Read pagination parameters
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  // req.query ->
  const { status, priority } = req.query;
  // req.query ->
  const { sortBy, order } = req.query;

  // validate statuses -->>
  const validStatuses = ["todo", "in_progress", "completed"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task status",
    });
  }

  // validate -->> proiorities
  const validPriorities = ["low", "medium", "high", "urgent"];

  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task priority",
    });
  }

  const allowedSortColumns = [
    "created_at",
    "updated_at",
    "due_date",
    "priority",
    "title",
  ];

  const allowedSortOrders = ["ASC", "DESC"];

  const sortColumn = sortBy || "created_at";
  const sortOrder = (order || "DESC").toUpperCase();
 
  // validate ->> 
  if (
  !allowedSortColumns.includes(sortColumn) ||
  !allowedSortOrders.includes(sortOrder)
) {
  return res.status(400).json({
    success: false,
    message: "Invalid sorting field or order",
  });
}

  // Step 3: Validate page and limit
  if (
    typeof page !== "number" ||
    page < 1 ||
    typeof limit !== "number" ||
    limit < 1 ||
    limit > 100
  ) {
    return res.status(400).json({
      success: false,
      message: "Page must be positive and limit must be between 1 and 100",
    });
  }

  // Step 4: Calculate offset
  const offset = (page - 1) * limit;

  // project exits ?
  checkProjectExistsQuery(projectId, ownerId, res);

  // check existing member and project owner !!
  checkProjectOwnerMemberQuery(projectId, ownerId, res);

  //: Fetch paginated tasks and total count

  // get task query func
  // improved with filter + pagination ->>
  getProjectTasksQuery(projectId, limit, offset, page, res, {
    status,
    priority,
  },sortColumn,sortOrder);
};
