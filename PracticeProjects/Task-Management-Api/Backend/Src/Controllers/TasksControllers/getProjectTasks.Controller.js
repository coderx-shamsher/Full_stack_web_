export const getAllProjectTasksController = (req,res) => {
    
    const projectId = req.params.projectId

    const ownerId = req.User.userId 

    console.log("projectId => ",projectId)
    console.log()
    console.log("OwnerId => ",ownerId)
   
    // check existing member and project owner !! 
    checkProjectOwnerMemberQuery(projectId,ownerId,res)

    // get task query func
    getProjectTasksQuery(projectId,res)
}