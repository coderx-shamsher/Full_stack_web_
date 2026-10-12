import { getProjectsQuery } from "../Database/Queries/GetProjects.query.js";

export const getProjectsController = async (req, res, next) => {
  try {
    console.log("\n --------------- jwt user logs-------------------\n");
    console.log(req.User);
    console.log("\n --------------- jwt user logs end-------------------\n");

    // get project  owner id from the jwt ->
    const userId = req.User.userId;

    // db query opertions
    const response = await getProjectsQuery(userId);

    return res.status(200).json({
      Success: true,
      projects: response,
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
