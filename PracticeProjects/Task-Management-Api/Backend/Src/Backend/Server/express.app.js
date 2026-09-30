import express from 'express'
import HealthRouter from '../../Routes/Health.Routes.js'
import homeRouter from '../../Routes/Home.Routes.js'
                              
const app = express()          
app.use(express.json())                  

app.use('/api',HealthRouter)
app.use(homeRouter)
                               
export default  app             
