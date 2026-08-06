import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const ConnectDB = async () => {
    try {
        // now ese ek vairable mein wrap kro and connection host ko console kro 
        //// await mongoose.connect(`${process.env.DB_connection_String}/${DB_Name}`)
        
       const mongodbConnection =   await mongoose.connect(`${process.env.DB_connection_String}/${DB_Name}`)
        console.log(`\n Mongodb Connected !! 🌐 DB HOST : ${mongodbConnection.connection.host}`)      
        // yeh ek checkpoint hai k hamara database mein kona host hai or ham kisse connected hai 

    } catch (error) {
        console.error("Error: Mongdb Connection Error", error);
        console.log("\nError: Mongdb Connection 🌐 Failed... ❌ \n", error);
        process.exit(1)  // learn about it 
    }
}

export default ConnectDB 
