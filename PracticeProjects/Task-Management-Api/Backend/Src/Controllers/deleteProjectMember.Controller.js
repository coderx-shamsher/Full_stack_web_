import { checkExistProjectMemberQuery } from "../Database/Queries/checkExistProjectMember.Query.js";
import { checkExistProjectMemberForDeleteQuery } from "../Database/Queries/checkExistProjectMemberForDelete.Query.js";
import { checkProjectOwnerQuery } from "../Database/Queries/checkProjectOwner.Query.js";
import { deleteProjectMemberQuery } from "../Database/Queries/deleteProjectMember.Query.js";

export  function deleteProjectMemberController(req, res){
  
    const ownerId = req.User.userId;
    const projectId = req.params.projectId;
    const memberId = req.params.memberId;
   
    // 
    console.log("\n-------Request Data Logs ------- \n")
    console.log("Owner Id : ",ownerId)
    console.log("Project Id : ",projectId)
    console.log("Member Id : ",memberId)
    console.log("\n-------Request Data Logs End------- \n")

   /// ------->
   /// project ownership checkout -> 
   /// ------->
    checkProjectOwnerQuery(
      projectId,
      ownerId,res
    );


   /// ->> 
   //  ------ checkprojectexisting member -> 
  checkExistProjectMemberForDeleteQuery(
      projectId,
      memberId,res
    );
    
    

  // ->> 
  // ------- delele project member query  
    deleteProjectMemberQuery(
      projectId,
      memberId,res
    );

   
 
}