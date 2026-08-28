const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Do alag ports (3000 aur 5000) ko aapas mein baat karne ki permission deta hai
app.use(express.json()); // Incoming JSON data ko parse karne ke liye

app.post("/signup", (req, res) => {
  console.log("User Data:", req.body); // Yeh aapka data console karega
  res.json({ message: "Data received successfully!" });
});

app.get("/users", (req, res) => {
  res.json({
    message: "data is eveything",
    usersdata: [
      {
        username: "testing1",
        email: "testing1@mail",
      },
      {
        username: "testing2",
        email: "testing2@mail",
      },
      {
        username: "testing3",
        email: "testing3@mail",
      },
      {
        username: "testing4",
        email: "testing4@mail",
      },
      {
        username: "testing5",
        email: "testing5@mail",
      },
    ],
  });
});
app.listen(5050, () => console.log("Server running on port 5050"));
