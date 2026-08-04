require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;

// json data 
const jsondata = {
     "user1" : "coderx",
      "Role" : "backend",
     "user2" : "coderx",
       "Role" : "fronend",
     "user3" : "coderx",
     "ROle"  : "devops"
} 

app.get("/", (req, res) => {
  res.send("Hello Backend !");
});
app.get("/home", (req, res) => {
  res.send("Hello its home page");
});
app.get("/about", (req, res) => {
  res.send("Hello its about page");
});

app.get("/login", (req, res) => {
  res.send("<h1> This is login page </h1>");
});

app.get('/json',(req,res)=>{
     res.json(jsondata)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
