import redisClient from "../Database/Config/redis.connection.js";
import { getProjectsQuery } from "../Database/Queries/GetProjects.query.js";

export const getProjectsController = async (req, res, next) => {
  try {
    console.log(`\n >> jwt user >> ${req.User} \n`);

    // get project  owner id from the jwt ->
    const userId = req.User.userId;

    //  // User-specific cache key
    const cachekey = `projects:user:${userId}`;

    // 1) check redis cache
    const cachedProjects = await redisClient.get(cachekey);

    if (cachedProjects !== null) {
      return res.status(200).json({
        Success: true,
        Projects: JSON.parse(cachedProjects),
        source: "Redis Cache",
      });
    }

    // 2. Cache MISS: fetch data from MySQL
    const projects = await getProjectsQuery(userId);

    // 3. Save result in Redis for 60 seconds
    await redisClient.set(cachekey, JSON.stringify(projects), {
      EX: 60,
    });

    // 4. Return response
    return res.status(200).json({
      Success: true,
      projects,
      source: "MySQL",
    });

  } catch (error) {
    error.context = {
      controller: "GetProjects.Controller.js",
      file: "GetProjects.query.js",
      function: "getProjectsQuery ()",
      operation: "project Fetch Failed !! ",
      layer: "Database Query",
    };
    next(error);
  }
};
