import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({
    path : "../../.env"
})

const AccessSecret = process.env.jwt_Access_Token_Secret

const RefSecret = process.env.jwt_Refresh_Token_Secret


// console.log(AccessSecret)
// console.log(RefSecret)

export function generateAccessToken(userId,username,email,role) {

    return jwt.sign(
        {
            userId,
            username,
            email,
            role,
        },
        AccessSecret,
        {
            expiresIn: process.env.jwt_Access_expires
        }
    );
}


export function generateRefreshToken(userId,username,email,role) {

    return jwt.sign(
        {
           userId,
            username,
            email,
            role,
        },
        RefSecret,
        {
            expiresIn: process.env.jwt_Refresh_expires
        }
    );
}