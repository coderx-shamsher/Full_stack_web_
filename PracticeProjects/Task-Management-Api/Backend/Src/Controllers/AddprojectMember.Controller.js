import { addProjectMemberQuery } from "../Database/Queries/AddProjectMember.Query.js";
import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { checkUserExistsQuery } from "../Database/Queries/CheckUserExists.Query.js";
import { checkExistProjectMemberQuery } from "../Database/Queries/checkExistProjectMember.Query.js";

export const addprojectMemberController = async   (req, res,next) => {
    // owner/requsting user
    const ownerId = req.User.userId;

    // projectId from url
    const projectId = req.params.projectId;

    // member to add
    const { memberId, role } = req.body;

    console.log("Owner:", ownerId);
    console.log("Project:", projectId);
    console.log("Member:", memberId);
    console.log("Role:", role);

    // -------------------------------
    // 1. Validate input (memberId and role)
    // -------------------------------

    if (!memberId || !role) {
      return res.status(400).json({
        Success: false,
        Message: "userId and role are required",
      });
    }
  
    if(typeof memberId !== "number" ){
       return res.status(403).json({
        Success : false,
         Message : "Type of memberId invalid !"
       })
    }

    if(typeof projectId !== "number" ){
       return res.status(403).json({
        Success : false,
         Message : "Type of projectId invalid !"
       })
    }

    if(typeof role !== "string" ){
       return res.status(403).json({
        Success : false,
         Message : "Type of role invalid !"
       })
    }
   

    // -------------------------------
    // 2. Check project ownership
    // -------------------------------
    checkProjectOwnerQuery(projectId,ownerId,res);


    // -------------------------------
    // 3. Check user exists (memberId, jo member ham add kr rahe hai vo exists bhi krta hai ?? )
    // -------------------------------
    checkUserExistsQuery(memberId,res)

    // -------------------------------
    // 4. Check duplicate member (member already added hai? )
    // -------------------------------
    checkExistProjectMemberQuery(projectId,memberId,res)


    // -------------------------------
    // 5. Add member (add member )
    // -------------------------------
    addProjectMemberQuery(projectId, memberId, role, res,next);

    
}