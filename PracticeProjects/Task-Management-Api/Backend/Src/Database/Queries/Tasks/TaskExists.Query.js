import pool from "../../Config/mysql.pool.js";

export async function TaskExistsQuery(taskId,project_Id,res) {
    try {
        
        const [task] = await pool.query(`select * from tasks where taskId = ? AND project_Id`,[taskId,project_Id])

        if(task.length > 0){
            console.log("\n ---------Task Lookup Query Logs ----------  \n")
            console.log("Task --> \n",task)
            console.log("\n ---------Task Lookup Query Logs End----------  \n")
            return res.status(200).json({
                Success : true,
                Message : "Task Fetched....!!",
                Tasks : task
            })
        }

       if(task.length === 0 ){
            console.log("\n ---------Task Lookup Failed Logs ----------  \n")
            console.log("Task --> \n",task)
            console.log("\n ---------Task Lookup Failed Logs End ----------  \n")
          
            return res.status(404).json({
                Message : "Task Not Found !!!",
                Success : false
            })
        }

    } catch (error) {
        console.log("\n---> Error Logs Of Task Lookup <---------\n")
        console.log(error)
        console.log("\n---> Error Logs Task lookup End<---------\n")
    }
    
}