import  jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export function RefreshTokens(refreshtoken) {

   const verify = jwt.verify(
        refreshtoken,
        process.env.jwt_Refresh_Token_Secret
    );

    const newAccessToken = jwt.sign(
        {
            userId: verify.userId,
            username: verify.username,
            email: verify.email,
            role: verify.role,
        },
        process.env.jwt_Access_Token_Secret,
        {
            expiresIn: process.env.jwt_Access_expires
        }
    );

    const newRefreshToken = jwt.sign(
        {
            userId: verify.userId,
            username: verify.username,
            email: verify.email,
            role: verify.role,
        },
        process.env.jwt_Refresh_Token_Secret,
        {
            expiresIn: process.env.jwt_Refresh_expires
        }
    );

    return {
        access: newAccessToken,
        refresh: newRefreshToken
    };
}