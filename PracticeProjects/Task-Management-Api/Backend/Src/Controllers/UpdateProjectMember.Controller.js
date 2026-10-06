import { checkProjectMemberForUpdateQuery } from "../Database/Queries/CheckProjectMemberForUpdate.query.js";
import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { updateProjectMemberQuery } from "../Database/Queries/updateProjectMemberQuery.js";

export const updateProjectMemberController = async (req, res) => {
  
    const ownerId = req.User.userId;
    const projectId = req.params.projectId;
    const memberId = req.params.memberId;
    const { role } = req.body;

    // ----------------------
    // verify role needed , jise update krna hai vo toh hona chaahie...
    // ----------------------
    console.log("ownerId : ", ownerId)
    console.log("projectId : ", projectId)
    console.log("memberId : ", memberId)


    if (!role) {
      return res.status(400).json({
        Success: false,
        Message: "Role is required",
      });
    }

    // ----------------------
    // check project owner query function
    // ----------------------
    checkProjectOwnerQuery(projectId, ownerId, res);

    // ----------------------
    // check project existing  member  owner query function
    // ----------------------
    // checkExistProjectMemberQuery(projectId, memberId, res);
    checkProjectMemberForUpdateQuery(projectId, memberId, res)
   
    // ----------------------
    // Update project member query function
    // ----------------------
    updateProjectMemberQuery(projectId, memberId, role,res);
   
  
}
