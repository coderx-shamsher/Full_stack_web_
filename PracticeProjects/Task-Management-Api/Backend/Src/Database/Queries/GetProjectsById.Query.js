import pool from "../Config/mysql.pool.js";

export const getProjectByIdQuery = async (projectId,ownerId) => {

  const [result] = await pool.query(
    `SELECT * FROM projects WHERE projectId = ? and ownerId =? `,
    [projectId,ownerId]
  );

  return result;
};