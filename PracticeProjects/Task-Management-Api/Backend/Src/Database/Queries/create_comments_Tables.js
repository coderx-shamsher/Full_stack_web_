import pool from "../Config/mysql.pool.js";

export async function CreateCommentsTable() {
  try {
    const result = await pool.query(`
       CREATE TABLE comments (
            
            commentId INT PRIMARY KEY AUTO_INCREMENT,
            
            task_id INT NOT NULL,

            user_id INT NOT NULL,

            content TEXT NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

            FOREIGN KEY (task_id)
                REFERENCES tasks(taskId)
                ON DELETE CASCADE,

            FOREIGN KEY (user_id)
                REFERENCES users(userId)
                ON DELETE CASCADE
        );
     `);

    if (result) {
      console.log("\n >> Comments table Creation Successful << \n");
      console.log(result);
    }
  } catch (error) {
    console.log("\n >> Error in Table Creation << \n ");
    console.log(error);
  }
}
