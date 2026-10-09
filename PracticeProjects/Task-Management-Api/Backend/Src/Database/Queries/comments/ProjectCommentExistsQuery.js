import pool from "../../Config/mysql.pool.js"

export const checkProjectCommentExistsQuery = async (commentId,projectId,res) => {
    try {
        
        const [comment] = await pool.query(`
            select * from project_comments where commentId = ? AND project_id = ? `,
            [commentId,projectId])

        if(comment.length >0){
            console.log("\n ------Comments Lookup Logs---------- \n")
            console.log("Comment Exist  ->> \n",comment)
            console.log("\n ------Comments Lookup Logs End------ \n")
        }

        if(comment.length <=0){
            console.log("\n ------Lookup Failed Logs---------- \n")
            console.log("Comment NOT Exist ->> \n",comment)
            console.log("\n ------Lookup Failed Logs End------ \n")

            return res.status(404).json({
                Success : false,
                Message : "Comment not found"
            })
        }

    } catch (error) {
        console.log("\n------Db Error Logs --------\n")
        console.log("\n -->> ")
        console.log("\n------Db Error Logs End--------\n")
    }                   
                              
                              
}                             