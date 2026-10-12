import pool from "../Config/mysql.pool.js";

export const deleteProjectMemberQuery = async (
  projectId,
  memberId,res
) => {
    try{

        const [result] = await pool.query(
            `DELETE FROM project_members
            WHERE project_id = ?
            AND memberId = ?`,
            [projectId, memberId]
        );
        
        console.log("--------- DB Query Logs ----------\n")
        console.log("Success -> Member deleted : \n",result)
        console.log("--------- DB Query Logs End ----------\n")
        return res.status(200).json({
            Success: true,
            Message: "Project member removed successfully"
        });
        
    } catch (error) {
     error.context = {
      controller: 'deleteProjectMember.Controller.js',
      file: "deleteProjectMember.Query.js",
      function: "deleteProjectMemberQuery ()",
      operation: "Project member Deletion Failed !! ",
      layer: "Database Query",
    };
     next(error)
  }
};