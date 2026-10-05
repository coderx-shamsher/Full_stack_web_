import { CreateProjectsQuery } from "../Database/Queries/projects.query.js";
import { CreateProjectService } from "../Services/CreateProject.service.js";

export const projecCreateController = (req, res) => {
  const { projectName, description, projectStatus } = req.body;
  const ownerId = req.User.userId;

  // console.log(req.body)
  console.log("\n ------- Request Body-----------\n");
  console.log("Project data ->  \n");
  console.log({
    ownerId,
    projectName,
    description,
    projectStatus,
  });
  console.log("\n ------- Request End -----------\n");

  // calling service function
//   CreateProjectService(ownerId, projectName, description, projectStatus, res);
  CreateProjectsQuery(ownerId, projectName, description, projectStatus, res)

//   return res.status(200).json({
//     success: true,
//     message: "Project data received",
//   });
};
