import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js'
import { createTaskController } from '../Controllers/TasksControllers/createTasks.Controller.js'
import { getAllProjectTasksController } from '../Controllers/TasksControllers/getProjectTasks.Controller.js'
                              
const tasksRouter  =  express.Router()

tasksRouter.post('/projects/:projectId/tasks',auth_middleware,createTaskController)

tasksRouter.get('/projects/:projectId/tasks',auth_middleware,getAllProjectTasksController)


export default  tasksRouter            