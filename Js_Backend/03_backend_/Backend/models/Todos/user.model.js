// first step is importing the package (mongoose)
import mongoose from 'mongoose';

// 2nd is create schema using the mongoose.schema() method and store it in a variable jo bhi name app us schema ka khrana hai

// write fields here in {}

// first way simple way
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   isActive: Boolean,
// });

// pro way ->
// -> timestamp (user kab create huya or kiya updated hai etc with timestamp using defualt built in mongoose )
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // for unique
    unique: true,
    // for all lowercase usernames
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    // custom require with message
    required: [true, 'password is required'],
  },
  isActive: Boolean,
},
 {timeseries:true} 
 // this is how to declare timestamp 
);

// exporting the schema
// why we cannot export the userschema ??

// now ham mongoose.model() k help se ham schema create krte hain yeh 2 arguaments leyta hai,  1) kiya schema create krna hai (name) , 2) kisse base par to hamne pahle he userschema create kra hai to uske bas pr he create krenge
// mongoose.model("schemaname",yourschema)

export const User = mongoose.model('User', UserSchema);
// export User keo kiya keoki hame kafi code files mein yehi schema use krna hota hai to hame aisi files se he schema ko import krte hain
// NOTE -> jo bhi name hamne model mein pass kiya let say "User" yan "Todo" to jab yeh database mein store hota hai to yeh 1) lowercase mein rehta hai or user se -> users hoga , Todo se -> todos , sab k piche s laga deta hai... its important to know.. little detail..

// these 3 lines are same...
