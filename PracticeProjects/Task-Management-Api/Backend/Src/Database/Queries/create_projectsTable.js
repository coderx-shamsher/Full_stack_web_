import pool from "../Config/mysql.pool.js";

export async function CreateProjectsTable() {
  try {
   
    const result = await pool.query(` 
          CREATE TABLE projects(
     projectId int PRIMARY KEY AUTO_INCREMENT,

     ownerId INT NOT NULL,

     projectName VARCHAR(300) NOT NULL,

     description TEXT,

     projectStatus ENUM('onGoing','completed','canceled')
       DEFAULT 'onGoing',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


   # create f-key
    CONSTRAINT fkey_projects_owner
      Foreign Key (ownerId) REFERENCES users(userId)


);    
            
`);
 
   if(result){
     console.log("\n Projects Table Creation successfull!!\n")
     console.log(result,"\n")
   }

  } catch (error) {
     
     console.log("\nProjects Table Creation failed !!! \n")
     console.log(error,"\n")
  }
}
