import express from 'express'
import { auth_middleware } from '../Middlewares/authMiddleware.js'                            
import { getProfile } from '../Controllers/GetProfile.Controller.js'
const getProfileRouter  =  express.Router()


getProfileRouter.get('/profile',auth_middleware,getProfile)

export default  getProfileRouter            