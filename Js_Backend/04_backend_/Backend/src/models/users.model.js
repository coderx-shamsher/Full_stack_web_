import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // for better sereaching in db
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is Required.....!! "],
        },
        refreshTokens: {
            type: String,
        },
    },
    { timestamps: true }
);

// using pre hook method from monogoose middlewares
// we creating middlewares
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        let rounds = 10;
        this.password = bcrypt.hash(this.password, rounds);
        return next();
    }

    // nagative
    //if(!this.isModified("password")) return next()
    //let rounds = 10
    //  this.password = bcrypt.hash(this.password,rounds)
});
// now comparing user password with db stored encrypted string
// custom method for hash password comparisons
UserSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    jwt.sign(
        // this is payload just fields of schema
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.Access_Token_Secret,
        {
            expiresIn: process.env.Access_Token_Expiry,
        }
        // expriy ham ek object mein pass krte hain
    );
};

UserSchema.methods.generateRefreshToken = function () {
    // refresh token mein info kam hoti hai 
    jwt.sign(
        // this is payload just fields of schema
        {
            _id: this._id,
            email: this.email,
        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn: process.env.Refresh_Token_Expiry,
        }
        // expriy ham ek object mein pass krte hain
    );
};

export const User = mongoose.model("User", UserSchema);
