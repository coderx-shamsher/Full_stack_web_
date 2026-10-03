import express from 'express'
import HealthRouter from '../../Routes/Health.Routes.js'
import homeRouter from '../../Routes/Home.Routes.js'
import UserRouter from '../../Routes/Users.Routes.js'
import AuthRouter from '../../Routes/Auth.Routes.js'
                              
const app = express()          
app.use(express.json())                  

app.use(homeRouter)
app.use('/api',HealthRouter)
app.use('/api',UserRouter)
app.use('/api',AuthRouter)
                               
export default  app             
