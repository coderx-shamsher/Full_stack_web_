import pool from "../Config/mysql.pool.js";

export async function Createdb() {
    try {
        const result =  await pool.query('CREATE DATABASE task_apis')
        
        if(result){
            console.log("\nDatabase is Created\n")
            console.log(result)
        }
    
    } catch (error) {
       console.log("\nError In Database Creation !! \n")
       console.log(error)    
    }
   

}

// if database not exist then use this 


export async function lookupdb() {
       try {
        const result =  await pool.query('SHOW DATABASES ')
        
        if(result){
            console.log("\nDatabaseS : \n")
            console.log(result)
        }
    
    } catch (error) {
       console.log("\nError In Database Lookup !! \n")
       console.log(error)    
    }
   
}

