import { lookupdb } from '../../Database/Queries/create-database.js'
import { CreateUserTable } from '../../Database/Queries/create_userTable.js'
import sqlConnection from '../../Database/Queries/sql.server.connection.js'
import { UserTableLookup } from '../../Database/Queries/UserTableLookup.js'
import { RunQueries } from '../../Database/Server/sql.server.run.js'
import app from './express.app.js'
import dotenv from 'dotenv'

dotenv.config({
    path :'.env'
})

const host = process.env.HOST
const port = process.env.PORT



app.listen(port,host,()=>{
    console.log(`Backend Server Running on http://${host}:${port}`)
})

console.log()
// - when backend start tab he database start hoga... 
// NOTE -< ek function hai jo query js functions k run krta hai 
RunQueries(sqlConnection)
// RunQueries(CreateUserTable)
RunQueries(UserTableLookup)

// RunQueries(lookupdb)


