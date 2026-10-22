import express, {type Request, type Response} from "express"
import cors from "cors"
import helmet from "helmet"
import getHealthRouter from "../routes/Health.routes.js"
import { checkSqlconnection } from "../config/checkConnection.js"
import { createTable } from "../queries/file.queries.js"
import testFileQueries from "../queries/test.queries.js"
import fileRouter from "../routes/Files.routes.js"
import { uploadErrorHandler } from "../middlewares/uploadError.middleware.js"
// import { checkSqlconnection } from "../config/mysql.pool.js"

const app = express()  // create app 

app.use(helmet())
app.use(cors())
app.use(express.json({
    limit : "10mb"
}))


// Routing ->> 
app.use('/api/health',getHealthRouter)
app.use('/api',fileRouter)

// adding the upload error middleware 
app.use(uploadErrorHandler)

checkSqlconnection()
// createTable() // ---> this function runs at one 

// -- test queries function runing 
// await testFileQueries()

export default app