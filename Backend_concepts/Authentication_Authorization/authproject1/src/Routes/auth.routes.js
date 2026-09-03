import { Router } from "express";
import pool from "../config/db/sql.connection.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
  debug: true,
});

const authrouter = Router();

authrouter.get("/signup", (req, res) => {
  res.status(200).json({
    message: "response ok and you will get detail",
  });

  console.log(process.env.jwt_secret);
});
// authrouter.get('/signup',signup)

// authrouter.post('/signup',signup)
authrouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password, id } = req.body;

  try {
    // check if user if already exist
    let userexits = await pool.query(
      `select * from users where id=${id} and name = '${username}' `,
    );

    // console.log(userexits[0][0])
    if (userexits[0][0]) {
      res.status(409).json({
        message: "users is already exist !! ",
      });
    } else {
      // password hashing
      const hashedpassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      // checking the hashed password
      // console.log(hashedpassword);

      const queryinsert =
        "insert into users (id,name,email,password) values (?,?,?,?)";

      // replace the plan password with hashed password
      const values = [id, username, email, hashedpassword];

      let result = await pool.query(queryinsert, values);

      console.log("data is inserted ...");
      console.log(result);
      console.log();
      console.log(result[0].insertId);
      console.log();
      // gen tokon using jwt
      if (process.env.jwt_secret) {
        try {
          const payload = {
            _id: result[0].insertId,
            email: email,
          };

          const token = jwt.sign(payload, process.env.jwt_secret, {
            expiresIn: "1d",
          });

          // after creating user response to frontend
          res.status(201).json({
            message: "user is registered ",
            success: true,
            userdetail: {
              username,
              email,
            },
            Token: token,
          });
        } catch (error) {
          console.log("error in env file ", error.message);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// /api/auth/profile
authrouter.get("/profile", async (req, res) => {
  const Token = req.headers.authorization?.split(" ")[1];

  if (!Token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const verifyuser = jwt.verify(Token, process.env.jwt_secret);
  //  console.log(verifyuser)
  const userprofile = await pool.query(
    `select * from users where id = ${verifyuser._id} and email = '${verifyuser.email}'`,
  );

  console.log(userprofile[0][0]);

  res.status(200).json({
    message: "User profile is fetched",
    user: {
      id: userprofile[0][0].id,
      username: userprofile[0][0].name,
      email: userprofile[0][0].email,
    },
  });

});

export default authrouter;
