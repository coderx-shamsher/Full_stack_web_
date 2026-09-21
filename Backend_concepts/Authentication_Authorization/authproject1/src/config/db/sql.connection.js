// import { lookup } from "dns";
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

async function addcolumn() {
    // let addcolumn= pool.query(`
    //      ALTER TABLE users
    //      ADD verifyed BOOLEAN DEFAULT false
    //   `)
   
      // console.log(addcolumn)

    let lookup = await pool.query('select * from users') 
  
    console.log(lookup)
    
}


async function opttable() {
    try {
        let queryopt_table = await pool.query(`
           CREATE TABLE user_otps (
              user_email VARCHAR(150) NOT NULL,
              user_id INT NOT NULL, 
              otpHash VARCHAR(500) NOT NULL,
              otp_create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Added missing comma

              -- Combined into a single, valid foreign key statement
              CONSTRAINT fk_user_otps_user_id 
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
           ); 
        `);

        console.log("Table created successfully:", queryopt_table);

    } catch (error) {
        console.error("Error creating table:", error.message);
    }
}

connectToDb();

const Queries = {
   lookupQuery_users : async function(){
     const lookupQuery = await pool.query(` 
          select * from users
        `)
    
        console.log(lookupQuery)
   },
   lookupQuery : async function(){
     const lookupQuery = await pool.query(` 
          select * from user_otps
        `)
    
        console.log(lookupQuery)
   },
   Insertquery : async function() {
       let q = `INSERT INTO user_otps(user_email,user_id,otpHash) VALUES (?,?,?)`

       let values = {
         email,
         id,
         otpHash
       }
   }
}

// show()
// users()
// session()
// addcolumn()
// opttable()
// Queries.lookupQuery_users()

export default pool;
