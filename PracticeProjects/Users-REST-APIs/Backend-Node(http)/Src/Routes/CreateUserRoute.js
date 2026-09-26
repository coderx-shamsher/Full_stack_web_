import { InsertDataIntoUsersTable } from "../Db/Queries/Insert.Query.js";
import setCorsHeaders from "../Middlewares/Cors.js";

const CreateUser = (req, res, path, method) => {

  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (path === "/create-user" && method === "POST") {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk
  });

  req.on("end", () => {
    const data = JSON.parse(body);

    console.log(data);

    // DataBase Query : insertion into database here -> 
    InsertDataIntoUsersTable(data.UserId,data.username,data.email,data.password)
    
    res.writeHead(201, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "User created successfully",
        data: data,
      })
    );
  });

  return;
};

}

export default CreateUser
