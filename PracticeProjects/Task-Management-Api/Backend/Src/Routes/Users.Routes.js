import express from 'express'
import { GetUsers } from '../Controllers/GetUsers.Controller.js'                        
import { CreateUser } from '../Controllers/CreateUser.Controller.js'
const UserRouter  =  express.Router() 

UserRouter.get('/get-user',GetUsers)
// /api/signup
UserRouter.post('/signup',CreateUser)


export default  UserRouter            