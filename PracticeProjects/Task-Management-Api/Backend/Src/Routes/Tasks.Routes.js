import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js'
import { createTaskController } from '../Controllers/TasksControllers/createTasks.Controller.js'
                              
const tasksRouter  =  express.Router()

tasksRouter.post('/projects/:projectId/tasks',auth_middleware,createTaskController)
tasksRouter.get('/projects/:projectId/tasks',auth_middleware,(req,res)=>{
    const projectId = req.params.projectId

    const ownerId = req.User.userId 

    console.log("projectId => ",projectId)
    console.log()
    console.log("OwnerId => ",ownerId)
    


})


export default  tasksRouter            