import express from 'express'
import { GetUsers } from '../Controllers/GetUsers.Controller.js'                        
import { CreateUser } from '../Controllers/CreateUser.Controller.js'
const UserRouter  =  express.Router() 

UserRouter.get('/get-user',GetUsers)
UserRouter.post('/create-user',CreateUser)


export default  UserRouter            