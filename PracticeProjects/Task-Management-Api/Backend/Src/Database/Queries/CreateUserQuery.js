import pool from "../Config/mysql.pool.js";

export async function CreateUserQuery(data, res) {
  const { userId, username, email, password, role } = data;

  try {
    const result = await pool.query(
      `
           INSERT INTO users(userId,username,userEmail,password,role) VALUES (?,?,?,?,?)
        `,
      [userId, username, email, password, role],
    );

    if (result) {
      console.log("\n User Inserted Into DB SuccessFull \n User Created !! \n");
      console.log(result);

      res.status(201).json({
        Message: "user Was Created !! ",
        Success: true,
        Details: result[1],
      });
    }
  } catch (error) {
    console.log("\nDB Error Or Somethink Else >> !! Checkout logs !! <<  \n");
    console.log(error);
    res.status(409).json({
      Message: "user already exists !! ",
      Success: false,
    });
  }
}
