## express basic routing code

# 3. Basic GET routes

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Ab browser me open karo:

```text
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/contact
```


`app.get()` ka meaning:

```js
app.get(path, handler);
```

- `path` = URL
- `handler` = request aane par run hone wala function

Express route path aur HTTP method ko match karke handler run karta hai. [expressjs](https://expressjs.com/en/5x/guide/routing/)

***

# 4. HTTP methods

## `GET`

Data read karne ke liye:

```js
app.get("/products", (req, res) => {
  res.send("All products");
});
```

