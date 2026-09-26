import http from "node:http";
import { URL } from "node:url";
import GetUsersRoute from "../Routes/GetUsersRoute.js";
import setCorsHeaders from "../Middlewares/Cors.js";
import CreateUser from "../Routes/CreateUserRoute.js";
import connection from "../db/Sql_DB_Connection.js";
import { showtables } from "../Db/Queries/ShowUserTable.Query.js"
import { CreateTable } from "../Db/Queries/CreateUserTable.Query.js";
import { showUsersTable } from "../Db/Queries/ShowUsersTable.Query.js";

const hostname = "localhost";
const port = 3069;

const server = http.createServer((req, res) => {
  
  //   res.statusCode = 200; // response ok (200)
  //   res.setHeader("Content-Type", "text/plain");
  //   res.end("hello its backend working a node server ");
  
  const baseURl = `http://${req.headers.host}`;
  const parserUrl = new URL(req.url, baseURl);
  const path = parserUrl.pathname;
  const method = req.method;
  
  // setup cors headers middleware
  setCorsHeaders(res)
  
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // routing here ->>>> 
  if (path === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("welcome this is home page / ");
  }
  
  GetUsersRoute(req, res, path, method);
  
  CreateUser(req,res,path,method)
  
  
});

// db queries here > 
showtables() 
// CreateTable() // execute only if table is not created 
showUsersTable()

server.listen(port, hostname, () => {
  console.log(`Backend Server Running at http://${hostname}:${port}`);
});
