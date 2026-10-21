import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: "localhost",
    port: 3308,
    user: "ubuntu_root",
    password: "ubuntu_root",
    database: "fileStorage",

    waitForConnections: true,
    connectionLimit: 10
})



export default pool