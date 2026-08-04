import express from "express";
import "dotenv/config";

const app = express();

// ager port env mein nhi hai to 4000 hamne provide kra hai hardcoded
const PORT = process.env.PORT || 4000;

// json dummy data

const UserData = [
  { id: 101, username: "testuser", admin: false },
  { id: 102, username: "user0x", admin: false },
  { id: 103, username: "athena", admin: false },
  { id: 104, username: "bob", admin: false },
  { id: 105, username: "coderx", admin: true },
  { id: 106, username: "user06", admin: false },
  { id: 107, username: "admin07", admin: true },
  { id: 108, username: "user08", admin: false },
  { id: 109, username: "archuser", admin: false },
  { id: 110, username: "ubuntu", admin: false },
];


app.get("/", (req, res) => {
  res.send("server is ready to rolll...");
});

app.get('/api/users',(req,res)=>{
     res.json(UserData)
})

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
