import connection from "../Sql_DB_Connection.js";

export function showtables() {
  connection.query("SHOW TABLES IN usersApi", (err, result) => {
    if (err) {
      console.log(
        `Error in Show Tables: => \n(Error Message) : -> ${err.message} \n(Error Cause) : -> ${err.cause} \n(Error Statuscode) : -> ${err.code}`,
      );
    } else {
      console.log(`\n Result -> Tables in userApi database : `);
      console.log(result);
    }
  });
}
