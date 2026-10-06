import pool from "../Config/mysql.pool.js";

export const updateProjectQuery = async (
  projectId,
  projectName,
  description,
  projectStatus
) => {

  const [result] = await pool.query(
    `UPDATE projects
     SET
       projectName = ?,
       description = ?,
       projectStatus = ?
     WHERE projectId = ?`,
    [
      projectName,
      description,
      projectStatus,
      projectId
    ]
  );

  return result;
};