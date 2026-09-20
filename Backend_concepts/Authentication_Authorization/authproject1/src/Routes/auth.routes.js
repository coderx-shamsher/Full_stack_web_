import { Router } from "express";
import pool from "../config/db/sql.connection.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { resourceUsage } from "process";

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
          const Rfpayload = {
            _id: result[0].insertId,
            email: email,
          };

          const RefreshToken = jwt.sign(Rfpayload, process.env.jwt_secret, {
            expiresIn: "7d",
          });

          const RFtokenhashed = crypto
            .createHash("sha256")
            .update(RefreshToken)
            .digest("hex");

          // session creation
          const session_values = {
            id: result[0].insertId,
            HashedRFTk: RFtokenhashed,
            Ip: req.ip,
            User_Agent: req.headers["user-agent"],
          };

          let insertsessionQuery = `INSERT INTO session_users(id,RefreshTkHash,Ip,User_Agent) VALUES (?,?,?,?)`;

          let sessionresult = await pool.query(insertsessionQuery, [
            session_values.id,
            session_values.HashedRFTk,
            session_values.Ip,
            session_values.User_Agent,
          ]);

          console.log("\n");
          console.log(sessionresult);
          console.log("\n");

          const Accesspayload = {
            _id: result[0].insertId,
            seesion_id: sessionresult[0].insertId,
            email: email,
          };

          const AccessToken = jwt.sign(Accesspayload, process.env.jwt_secret, {
            expiresIn: "1h",
          });

          //  const session = await pool.query()

          // set on res cookie
          res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          // after creating user response to frontend
          res.status(201).json({
            message: "user is registered ",
            success: true,
            userdetail: {
              username,
              email,
            },
            AcessToken: AccessToken,
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

// /api/auth/refresh-token
authrouter.get("/refresh-token", async (req, res) => {
  const RefreshToken = req.cookies.RefreshToken;

  if (!RefreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  // verify the user detail with refresh token
  const userverfy = jwt.verify(RefreshToken, process.env.jwt_secret);

  // log the info
  console.log(userverfy);

  // checking for revoked user in db
  // create refresh token hash
  const RefreshTokenHash = crypto
    .createHash("sha256")
    .update(RefreshToken)
    .digest("hex");

  const sessionUser = await pool.query(` 
        select  * from session_users 
        where RefreshTKHash = '${RefreshTokenHash}' And Revoked = false ;
    `);

  // if session not found
  if (!sessionUser) {
    return res.status(401).json({
      Message: "Inviled refresh token  !! ",
    });
  }

  // creating nre access token
  const NewAccessToken = jwt.sign(
    {
      id: userverfy._id,
      email: userverfy.email,
    },
    process.env.jwt_secret,
    {
      expiresIn: "1h",
    },
  );

  // for extra security we can also re-gen the refesh token also
  const NewRefreshToken = jwt.sign(
    {
      id: userverfy._id,
      email: userverfy.email,
    },
    process.env.jwt_secret,
    {
      expiresIn: "7d",
    },
  );

  const NewRefreshTokenHash = crypto
    .createHash("sha256")
    .update(NewRefreshToken)
    .digest("hex");

  // update the newrefreshtoken
  const update_refreshTokenhash_Query = await pool.query(`
      update session_users 
          set RefreshTKHash = '${NewRefreshTokenHash}'
          where  RefreshTKHash = '${RefreshTokenHash}'
    `);

  // console result
  console.log(update_refreshTokenhash_Query);

  // seting refresh token into cookies
  res.cookie("RefreshToken", NewRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Access Token refreshed successfull",
    NewAccessToken,
  });
});

// /api/auth/profile
authrouter.get("/profile", async (req, res) => {
  // get access token 0>
  const Token = req.headers.authorization?.split(" ")[1];

  // console.log(Token) // checkout the token in console

  // const RefreshToken = req.cookies.RefreshToken
  // console.log(RefreshToken)
  // if (!RefreshToken) {
  //   return res.status(401).json({
  //     message: "token not found",
  //   });
  // }

  // checkout access token 0>
  if (!Token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const verifyuser = jwt.verify(Token, process.env.jwt_secret);
  console.log(verifyuser);

  const userprofile = await pool.query(
    `select * from users where id = ${verifyuser.id} and email = '${verifyuser.email}'`,
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

// /api/auth/login

authrouter.post("/login", async (req, res) => {
  let user = req.body;

  console.log(user.email);
  console.log(user.password);

  try {
    let userquery_find_user = await pool.query(`
        select * from users 
        where email='${user.email}'
        `);
    console.log(userquery_find_user[0][0]);

    if (!userquery_find_user[0][0]) {
      return res.status(400).json({
        message: "User not found !!",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error In DB Query ! 0> \n", error, "\n");
  }

  // for login logic
  try {
    const hashedpassword = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");

    let verify_user = await pool.query(`
        select * from users 
        where email='${user.email}' and password='${hashedpassword}'
        `);
    
    console.log("\n: user detail 0> ", verify_user[0][0]);

    if (!verify_user) {
      return res.status(400).json({
        message: "User email and password is Wrong!",
        success: false,
      });
    } else {
   
      // creating refresh token
      const RefreshToken = jwt.sign({
        id : verify_user[0][0].id,
        email : verify_user[0][0].email
      },process.env.jwt_secret,{
        expiresIn : '7d'
      })
   


      // creating refreshtoken hash 
      
      const RefreshTKHash = crypto.createHash("sha256").update(RefreshToken).digest("hex")

      const session_query_values = {
        userid : verify_user[0][0].id,
        RefreshTKHash : RefreshTKHash,
        Ip : req.ip,
        User_Agent : req.headers["user-agent"]
      }
     
      let sessionInsertQuery= `INSERT INTO session_users(id,RefreshTkHash,Ip,User_Agent) VALUES (?,?,?,?)`
    
      let sessionUserQueryResult = await pool.query(sessionInsertQuery,[
        session_query_values.userid,
        session_query_values.RefreshTKHash,
        session_query_values.Ip,
        session_query_values.User_Agent
      ])
     
      
     console.log(sessionUserQueryResult)
   
     // access token
     const AccessToken = jwt.sign({
        id : sessionUserQueryResult[0].insertId,
        email : verify_user[0][0].email
      },process.env.jwt_secret,{
        expiresIn : '15m'
      })
  
    // setup in cookie on frontent 
    res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
     
      res.status(200).json({
        message: "Logged!!",
        success: true,
        user: {
          username: verify_user[0][0].name,
          email: verify_user[0][0].email,
          userid: verify_user[0][0].id,
        },
        AccessToken : AccessToken
      });
    }
  } catch (error) {
    console.log("Errors", error)
  }
});

// /api/auth/logout

authrouter.get("/logout", async (req, res) => {
  // first get the refresh token

  const refToken = req.cookies.RefreshToken;

  if (!refToken) {
    return res.status(400).json({
      message: "Refresh token not found !! ",
    });
  }

  // hasing the refresh token
  const RefreshTokenHash_for_session_logout = crypto
    .createHash("sha256")
    .update(refToken)
    .digest("hex");

  // query to find session user in db
  const sessionfind = await pool.query(
    `select * from session_users 
    where Revoked=false and RefreshTKHash = '${RefreshTokenHash_for_session_logout}' `,
  );

  // console the session user detail and checking
  console.log("session user founded -==>>> ", sessionfind[0][0]);
  console.log(
    " user_session_id => ",
    sessionfind[0][0].user_session_id,
    "\n id =>",
    sessionfind[0][0].id,
    "\n Revoked => ",
    sessionfind[0][0].Revoked,
    "\n",
  );

  // ager session nhi milta hai to json response ->
  if (!sessionfind) {
    return res.status(400).json({
      message: "invaild refresh token",
    });
  }

  try {
    let logout_query = `
          update session_users 
          set Revoked = true
          where user_session_id = ${sessionfind[0][0].user_session_id} and id = ${sessionfind[0][0].id} `;

    let logout_query_result = await pool.query(logout_query);

    console.log("logout update successfuly in sql table ");
    console.log(logout_query_result);

    // clear cookies
    res.clearCookie("RefreshToken");

    res.status(200).json({
      message: " User logout successful !!! ",
    });
  } catch (error) {
    console.log("error in update logout session query", error, " \n");
    console.log("error Message", error.message);
  }
});

authrouter.get("/logout-all", async (req, res) => {
  const RefreshToken = req.cookies.RefreshToken;

  // console.log(RefreshToken);  //check up console

  if (!RefreshToken) {
    return res.status(400).json({
      message: "Refresh-Token not found ",
    });
  }

  let userverfiy = jwt.verify(RefreshToken, process.env.jwt_secret);

  // console.log(userverfiy); // checkout console

  // query for db search
  try {
    let result = await pool.query(`
          select * from users where id=${userverfiy.id} and email='${userverfiy.email}'  
          `);
    // console.log(result)
  } catch (error) {
    console.log("Error In Db Query 0> \n", error, "\n");
    return res.status(400).json({
      message: "User not Founded !!",
      success: false,
    });
  }

  // for session user db search 0>
  try {
    // creating hash of refresh token
    let RefreshTokenHash_For_Session_Logout = crypto
      .createHash("sha256")
      .update(RefreshToken)
      .digest("hex");

    // database query ->
    let userSession = await pool.query(` 
          select * from session_users 
          where id=${userverfiy.id} and Revoked=false and RefreshTKHash='${RefreshTokenHash_For_Session_Logout}'
         `);

    console.log(" Users Session Details ->", userSession[0][0]);

    // logout all query
    // update session users
    let logout_all_query = await pool.query(`
      update session_users 
      set Revoked=true 
       where id=${userverfiy.id} and Revoked=false and RefreshTKHash='${RefreshTokenHash_For_Session_Logout}'
      `);

    console.log(" Users Session Details ->", userSession[0][0]);
    // console.log(logout_all_query)

    return res.status(200).json({
      message: "User logout From all Devices !!",
      success: true,
    });
  } catch (error) {
    console.log("ERROR In db query ! \n", error, "\n");

    return res.status(400).json({
      message: "User logout failed!!",
      success: false,
    });
  }
});

export default authrouter;
