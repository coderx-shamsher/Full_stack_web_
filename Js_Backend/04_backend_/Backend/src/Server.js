// 1) step is to setup dotenv , keoki hamein env variables bhi load krne honge usi time par jab mera server load hoga  and first hame use setup krna hoga 

import 'dotenv/config'

import ConnectDB from "./db/connection.js";



// calling function
ConnectDB()