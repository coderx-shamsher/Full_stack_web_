import express from 'express'
import TestRouter from '../Routes/GetHello.Route.js'
import CreateUserRouter from '../Routes/CreateUser.route.js'
import GetUsersRouter from '../Routes/GetUsers.Router.js'
import UpdateUserRouter from '../Routes/UpdateUser.Route.js'

const app = express() // create a app with express()  

// setup express json middleware to parse json data 
app.use(express.json()) 

app.use('/',TestRouter)
app.use('/api/',CreateUserRouter)
app.use('/api/',GetUsersRouter)
app.use('/api/',UpdateUserRouter)

export default app
