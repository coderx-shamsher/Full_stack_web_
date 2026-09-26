import GetUser from "../controllers/Getusers.js";
import setCorsHeaders from "../Middlewares/Cors.js";

// users.js
const GetUsersRoute = (req, res, path, method) => {
  
  setCorsHeaders(res)
  
   if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

  if (path === "/get-users" && method === "GET") {
    GetUser(req, res); //
  }
  
};

export default GetUsersRoute;
