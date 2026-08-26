import db from '../db/docker.connection.js'

export default function showtables() {
  let query1 = `
        SHOW TABLES;
        `;

  db.query(query1, (error, result) => {
    if (error) {
      console.log("Database query Error Cause : \n", error.cause);
      console.log("Database query Error Message : \n", error.message);
    } else {
      console.log("Tables :\n", result);
    }
  });
}