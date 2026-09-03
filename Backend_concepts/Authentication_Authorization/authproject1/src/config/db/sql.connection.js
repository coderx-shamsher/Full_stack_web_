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

connectToDb();
// show()
// users()


export default pool;
