export const deleteTaskByidController = (req,res) => {       
         // request data verify 

    const projectId = req.params.projectId
    const taskId = req.params.taskId 
    const projectOwnerid = req.User.userId 

    console.log("projectId : -> ",projectId)
    console.log("TaskId : -> ",taskId)
    console.log("ProjectOwnerId : -> ",projectOwnerid)
    console.log()
}                             

