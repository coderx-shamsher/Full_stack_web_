import pool from "../../Config/mysql.pool.js";

export const getProjectMemberDetailsQuery = async (
  projectId,
  userId
) => {
  const [result] = await pool.query(
    `SELECT
        p.*,
        pm.role,
        pm.joined_at,
        u.userId,
        u.username,
        u.userEmail
     FROM projects AS p
     INNER JOIN project_members AS pm
       ON p.projectId = pm.project_id
     INNER JOIN users AS u
       ON pm.memberId = u.userId
     WHERE p.projectId = ?
       AND pm.memberId = ?`,
    [projectId, userId]
  );

   console.log(result)
};