import { lookupdb } from '../../Database/Queries/create-database.js'
import { CreateProjectsTable } from '../../Database/Queries/create_projectsTable.js'
import { CreateUserTable } from '../../Database/Queries/create_userTable.js'
import sqlConnection from '../../Database/Queries/sql.server.connection.js'
import { Project_Table_lookup } from '../../Database/Queries/Project_Table_lookup.js'
import { UserTableLookup } from '../../Database/Queries/UserTableLookup.js'
import { RunQueries } from '../../Database/Server/sql.server.run.js'
import app from './express.app.js'
import dotenv from 'dotenv'
import { CreateTableMembers } from '../../Database/Queries/create_project_members.js'
import { MembersTableLookup } from '../../Database/Queries/members_table_lookup.js'
import { CreateTablesTasks } from '../../Database/Queries/create_tasks_Table.js'
import { taskTableLookup } from '../../Database/Queries/tasks_table_lookup.js'
import { CreateCommentsTable } from '../../Database/Queries/create_comments_Tables.js'
import { commentsTableLookup } from '../../Database/Queries/comments_table_lookup.js'

dotenv.config({
    path :'.env'
})

const host = process.env.HOST
const port = process.env.PORT



app.listen(port,host,()=>{
    console.log(`Backend Server Running on http://${host}:${port}\n`)
    sqlConnection() // starting the Database Server with backend server 
})
console.log()


// NOTE -< RunQueries ek function hai jo query js functions k run krta hai  ( temp function )
// RunQueries(sqlConnection)      // query for sql db connection 
// RunQueries(CreateProjectsTable) // query for creating projects table
// RunQueries(CreateUserTable)    // query for creating users table
// RunQueries(UserTableLookup)    /// query for lookup users table 
// RunQueries(lookupdb)         // query for lookupdb's
// RunQueries(Project_Table_lookup)  //query for lookup projects table
// RunQueries(CreateTableMembers)    // query for create members table 
// RunQueries(MembersTableLookup)    // query for lookup members table  

// RunQueries(CreateTablesTasks)    // query for create tasks table 
// RunQueries(taskTableLookup)        // query for tasks table lookup 

// RunQueries(CreateCommentsTable)   // query for create comments table 
// RunQueries(commentsTableLookup)      // query lookup comments table
