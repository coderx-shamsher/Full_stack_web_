import express from 'express'
import pool from '../Db/Server/db.server.connection.js'

const CreateUserRouter = express.Router()

// express.json()

CreateUserRouter.get('/create-users',(req,res)=>{
    res.status(200).json({
        message : "users get /create-user endpoint it working....."
    })
})

CreateUserRouter.post('/create-users',(req,res)=>{
    // console.log(req.body)
    // let {username , userId, email,password} = req.body
    let user = req.body
      console.log(user)
    
    // query for getting stucture of users table -> 
    // pool.query('DESC users',(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log(result)
    // })

    let insertquery = ' INSERT INTO users(userId,username,email,password) VALUES (?,?,?,?)'

    pool.query(insertquery,[user.userId,user.username,user.email,user.password],(err,result)=>{
        if(err)
            console.log(err)
        else 
            console.log("data is inserted into table <<__>>")
            console.log(result)
            res.status(201).json({
                message : "User is created SuccessFully !!",
            })
    })

  
})


export default CreateUserRouter