import pool from "../Config/mysql.pool.js";

export const checkProjectOwnerQuery = async (projectId, ownerId, res) => {
  try {
    const [result] = await pool.query(
      `SELECT projectId,ownerId
            FROM projects
            WHERE projectId = ?
            AND ownerId = ?`,
      [projectId, ownerId],
    );

    console.log("\n---------Checkout project Ownership --------\n");
    console.log("Project Owner --> \n", result);
    console.log("\n---------Checkout project Ownership --------\n");

    if (result.length === 0) {
      return res.status(403).json({
        Success: false,
        Message: "You are not the owner of this project",
      });
    }
  } catch (error) {
    console.log("\n------------ Db Error Logs ------------ \n");
    console.log("-->> Db Error: ", error);
    console.log("\n------------ Db Error Logs ------------ \n");
    return res.status(500).json({
      Success: false,
      Message: "Internal Server Error | DB Error",
    });
  }
};
