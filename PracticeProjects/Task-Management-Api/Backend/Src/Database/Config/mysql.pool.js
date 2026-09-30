import mysql from 'mysql2/promise'
import dontenv from 'dotenv'

// dontenv.config({
//     path : "../../../.env"
// })

dontenv.config()

const dbhost = process.env.DatabaseHost
const dbuser = process.env.DatabaseUser
const dbpass = process.env.DatabasePassword
const dbport = process.env.DatabasePort
const dbname = process.env.DatabaseName

const pool = mysql.createPool({
  host : dbhost,
  port : dbport,
  user : dbuser,
  password : dbpass,
  database : dbname
})


export default pool