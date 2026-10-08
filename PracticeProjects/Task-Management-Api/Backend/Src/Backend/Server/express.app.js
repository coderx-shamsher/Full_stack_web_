import express from 'express'
import HealthRouter from '../../Routes/Health.Routes.js'
import homeRouter from '../../Routes/Home.Routes.js'
import UserRouter from '../../Routes/Users.Routes.js'
import AuthRouter from '../../Routes/Auth.Routes.js'
import getProfileRouter from '../../Routes/GetProfile.Routes.js'
import cookieParser from 'cookie-parser'
import adminRouter from '../../Routes/Admin.Routes.js'
import projectsRouter from '../../Routes/Projects.Routes.js'
import projectMembersRouter from '../../Routes/Projects_members.Routes.js'
import tasksRouter from '../../Routes/Tasks.Routes.js'

const app = express()          
app.use(express.json())                  
app.use(cookieParser())
app.use(homeRouter)
app.use('/api',HealthRouter)
app.use('/api',UserRouter)  //  /api/signup
app.use('/api/auth',AuthRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/user',getProfileRouter) 
app.use('/api/admin',adminRouter)

// project routing 
// /api/projects
app.use('/api',projectsRouter)

// /api/projects/:projectId/members

app.use('/api',projectMembersRouter)
 

// /api/projects/:projectId/tasks
app.use('/api',tasksRouter)

export default  app             
