import pool from "../Config/mysql.pool.js";

export async function commentsTableLookup() {
    try {
        const result = await pool.query(`select * from comments`)
        if(result){
            console.log("\n >>Lookup Successful! <<\n")
            console.log(result)
        }
    } catch (error) {
        console.log("\n >> Error lookup failed << \n")
        console.log(error)
    }
}