import db from '../db/docker.connection.js' 


export default function insert(tablename='dockerusers'){
    

     let query = `INSERT INTO ${tablename} (name) VALUE
          ('user1'),     
          ('userx'),     
          ('admin'),     
          ('dockeruser'),     
          ('dockeradmin'),     
          ('coderx'),     
          ('devop'),     
          ('serveradmin'),     
          ('testuser');     
     `

     db.query(query,(err,result)=>{
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

