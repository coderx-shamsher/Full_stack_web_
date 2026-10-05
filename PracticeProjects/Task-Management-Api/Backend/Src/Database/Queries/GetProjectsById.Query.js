import pool from "../Config/mysql.pool.js";

export const getProjectByIdQuery = async (projectId) => {

  const [result] = await pool.query(
    `SELECT * FROM projects WHERE projectId = ?`,
    [projectId]
  );

  return result;
};