import express, {type Request, type Response} from "express"
import cors from "cors"
import helmet from "helmet"
import getHealthRouter from "../routes/Health.routes.js"

const app = express()  // create app 

app.use(helmet())
app.use(cors())
app.use(express.json({
    limit : "10mb"
}))


// Routing ->> 
app.use('/api/health',getHealthRouter)



export default app