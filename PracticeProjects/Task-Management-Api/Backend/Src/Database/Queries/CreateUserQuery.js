import {
  generateAccessToken,
  generateRefreshToken,
} from "../../Services/Auth.GenTokens.service.js";
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

      // generation of access and refresh token
      const AccessToken = generateAccessToken(userId, username, email, role);
      const RefreshToken = generateRefreshToken(userId, username, email, role);

      // set access and refresh into user side (frontend cookies)
      res.cookie("AccessToken", AccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: true,
      });
    
      res.cookie("RefreshToken", RefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        Message: "user Was Created !! ",
        Success: true,
        AccessToken,
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
