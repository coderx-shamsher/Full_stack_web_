import pool from "../Config/mysql.pool.js";

export async function createProjectComments() {
  try {
    const result = await pool.query(`
        CREATE TABLE project_comments (
            commentId INT PRIMARY KEY AUTO_INCREMENT,
            project_id INT NOT NULL,
            user_id INT NOT NULL,
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            FOREIGN KEY (project_id) REFERENCES projects(projectId),
            FOREIGN KEY (user_id) REFERENCES users(userId)
        );
    `);

    console.log("\ntable created -->> \n")
    console.log(result)
    console.log("\n ")
  } catch (error) {
     console.log("Error in Table creation ---> \n")
     console.log(error)
     console.log("\n ")

  }
}
