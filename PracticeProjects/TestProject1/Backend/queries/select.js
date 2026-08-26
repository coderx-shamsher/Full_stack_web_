import db from '../db/docker.connection.js'


function SelectFromTable(selection='*',tablename='dockerusers'){
    
     let showquery = `SELECT ${selection} FROM ${tablename}`

     db.query(showquery,(err,result)=>{
         if(err){
            console.log("Database Error : ", err.message)
            console.log("Database Error Cause : ", err.cause)
         }
         else{
            console.log("Data retrevial -> \n")
            console.log(result)
         }
     })

}

export {SelectFromTable}