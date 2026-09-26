import connection from "../Sql_DB_Connection.js";

export function showUsersTable() {
  connection.query("SELECT * FROM  usersApi.users", (err, result) => {
    if (err) {
      console.log(
        `Error : => \n(Error Message) : -> ${err.message} \n(Error Cause) : -> ${err.cause} \n(Error Statuscode) : -> ${err.code}`,
      );
    }
    else{
        console.log(`\nUsers table -> `)
        console.log(result)
    }
  });
}
