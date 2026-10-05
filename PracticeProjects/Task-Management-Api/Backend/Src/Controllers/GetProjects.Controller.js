
import { getProjectsQuery } from "../Database/Queries/GetProjects.query.js"

export const getProjectsController =  async (req,res)=>{
    
    try {
        
        
        console.log("\n --------------- jwt user logs-------------------")
        console.log(req.User)
        console.log("\n --------------- jwt user logs end-------------------")
        
        // get project  owner id from the jwt -> 
        const userId = req.User.userId
        
        // db query opertions
        const response = await getProjectsQuery(userId)
        
        return res.status(200).json({
            Success : true,
            projects : response
        })
    
    } catch (error) {
             console.log("\n --------- Db Error Log --> \n")
             console.log(error)
             console.log("\n --------- Db Error Log End --> \n")
            return res.status(500).json({
                Success : false,
                Message : "This user has no projects !!",
            })
      } 
}