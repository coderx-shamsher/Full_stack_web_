const express = require('express');
const cors  = require("cors")
const bodyParser = require("body-parser")
const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://localhost:5173'
}))

// app.use(bodyParser())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello backend! ');
});

app.post('/signup', (req, res) => {
    console.log(req.body)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});