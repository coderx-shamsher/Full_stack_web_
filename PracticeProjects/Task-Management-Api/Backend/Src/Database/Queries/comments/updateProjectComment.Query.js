import pool from "../../Config/mysql.pool.js";
export const updateprojectCommentQuery = async (commentId,projectId,comment,res) => {
  try {

    const [update] = await pool.query(`update project_comments 
        set comment =? where commentId =? AND project_id =? 
        `,[comment,commentId,projectId])

    if(update.affectedRows >0){
        console.log("\n --------Updated Comment Logs ---------\n")
        console.log("Update Result -->> ",update)
        console.log("\n --------Updated Comment Logs End ---------\n")
     
        return res.status(200).json({
            Success : true,
            Message : "Comment Updated Success-Fully"
        })
    
    }
  } catch (error) {
     console.log("\n -------Db Error Logs ------- \n")
     console.log("Update Error : ",error)
     console.log("\n -------Db Error Logs End ------- \n")
  }
};
