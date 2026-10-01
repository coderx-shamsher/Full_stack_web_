import pool from "../Config/mysql.pool.js";

export async function Project_Table_lookup() {
    try {
        const result = await pool.query(`select * from projects;`)

        if(result){
            console.log("\nlookup for table !! successfull\n")
            console.log(result)
        }
    } catch (error) {
        console.log("\nLookup table failed !! \n")
        console.log(error)
    }
}