import redisClient from "../Database/Config/redis.connection.js";
import { getProjectByIdQuery } from "../Database/Queries/GetProjectsById.Query.js";

export const GetProjectsByIdController = async (req, res, next) => {
  try {
    // User identity from JWT
    const userId = req.User.userId;

    // Project ID from URL
    const projectId = Number(req.params.projectId);

    console.log("\n ------>> User Request << --------- \n");
    console.log("JWT User ID:", userId);
    console.log();
    console.log("Requested Project ID:", projectId, typeof projectId);
    console.log("\n --------------------------------------------- \n");

    if (!projectId) {
      return res.status(403).json({
        Success: false,
        Message: "projectid Needed !!",
      });
    }

    if (typeof projectId !== "number") {
      return res.status(403).json({
        Success: false,
        Message: "projectid type invalid !!",
      });
    }

    // Unique cache key per user and project
    const cachekey = `project:${projectId}:user:${userId}`;

    // 1. Check Redis cache
    const cachedProject = await redisClient.get(cachekey);

    if (cachedProject !== null) {
      return res.status(200).json({
        Success: true,
        project: JSON.parse(cachedProject),
        source: "Redis Cache",
      });
    }
  
    // 2. Cache miss: fetch from MySQL
    // db opertions ->>>
    getProjectByIdQuery(projectId, userId, res,cachekey);

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
};
