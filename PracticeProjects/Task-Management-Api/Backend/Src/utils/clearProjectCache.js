import pool from "../Database/Config/mysql.pool.js";
import redisClient from "../Database/Config/redis.connection.js";

export const clearProjectCache = async (projectId) => {
  // collecting userid(memeberid) from projects and projectMembers
  const [users] = await pool.query(
    `SELECT ownerId AS userId
     FROM projects
     WHERE projectId = ?

     UNION

     SELECT memberId AS userId
     FROM project_members
     WHERE project_id = ?`,
    [projectId, projectId],
  );
 
  // creating redis key 
  const keys = users.map((user) => `projects:user:${user.userId}`);

  // Also clear individual project-detail cache keys
  const detailKeys = users.map(
    (user) => `project:${projectId}:user:${user.userId}`,
  );

  if (keys.length > 0 || detailKeys.length > 0) {
    await redisClient.del([...keys, ...detailKeys]);
  }
  
};
