import connection from "../Sql_DB_Connection.js";

export function InsertDataIntoUsersTable(userid, username, email, password) {
  let Query = ` INSERT INTO users(userId,username,email,password) 
    VALUES (?,?,?,?)
    `;
  let values = [userid, username, email, password];

  connection.query(Query, values, (err, result) => {
    if (err) {
      console.log(
        `Error in Show Tables: => \n(Error Message) : -> ${err.message} \n(Error Cause) : -> ${err.cause} \n(Error Statuscode) : -> ${err.code}`,
      );
    }
    else{
      console.log(`Result => UserData is Inserted into table !! `,result)
    }

  });
}
