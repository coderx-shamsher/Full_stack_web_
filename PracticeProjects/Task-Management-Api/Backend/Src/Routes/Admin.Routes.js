import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js'
import { AdminRouteController } from '../Controllers/Admin.Controller.js';
                              
const adminRouter  =  express.Router()

adminRouter.get("/dashboard",auth_middleware,AdminRouteController)
export default  adminRouter            