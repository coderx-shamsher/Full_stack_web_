import mysql2 from "mysql2/promise";

let pool = await mysql2.createPool({
  host: "localhost",
  user: "ubuntu_root",
  port : 3308,
  password: "ubuntu_root",
  database: "ubuntu_users",
});

async function show () {
     let [row] =  await pool.query("show tables")
     console.log(row)
     console.log(row[0])
}

async function users() {
    let users = await pool.query("select * from users")
    console.log(users[0])
}

async function connectToDb() {
  try {
    const connection = await pool.getConnection();
    console.log("connected successfuly with sql server ! ");
    connection.release();
  } catch (error) {
    console.log("Connection error from sql ", error.message);
  }
}

async function session() {
  //  let user = await pool.query('select id, name, email from users')

  //  console.log(user[0][])

  let sessionqy = `
  CREATE TABLE session_users(
      user_session_id  serial not null, 
      id INT,
      RefreshTkHash VARCHAR(400) NOT NULL,
      Ip VARCHAR(100) NOT NULL,
      User_Agent VARCHAR(100) NOT NULL,
      login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      Revoked BOOLEAN DEFAULT false ,
      FOREIGN KEY (id) references users(id) on delete cascade  
  );
  `
 
  // creating table mysql query --->> 
//  let sess = await pool.query(sessionqy)
//  console.log(sess)
 
// retreiving data mysql query ---> 
 let user = await pool.query('select * from session_users')
  console.log(user[0])
}

connectToDb();
// show()
// users()
session()

export default pool;
