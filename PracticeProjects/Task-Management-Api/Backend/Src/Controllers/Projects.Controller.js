import { CreateProjectsQuery } from "../Database/Queries/projects.query.js";
import { CreateProjectService } from "../Services/CreateProject.service.js";

export const projecCreateController = (req, res,next) => {
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
  CreateProjectService(ownerId, projectName, description, projectStatus, res,next)

};
