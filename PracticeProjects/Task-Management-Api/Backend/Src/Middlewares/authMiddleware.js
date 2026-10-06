import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function auth_middleware(req, res, next) {
  try {
    // console.log(req.body);

    // get access token from req cookies
    const token = req.cookies.AccessToken;
    // console.log(token); // verify access token

    // -> if not token !token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // console.log(process.env.jwt_Access_Token_Secret)

    // decoded
    const verifytoken = jwt.verify(token, process.env.jwt_Access_Token_Secret);

    req.User = verifytoken;
    console.log("\nJWT PAYLOAD:", verifytoken);

    // send to next
    next();
  } catch (error) {
    console.log("JWT verification failed:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
}
