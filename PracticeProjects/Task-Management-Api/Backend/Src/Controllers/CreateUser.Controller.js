import { CreateUserQuery } from "../Database/Queries/CreateUserQuery.js";
import { CreateUserService } from "../Services/CreateUser.service.js";

export async function CreateUser(req,res) {
    const data = req.body
    CreateUserService(data,res)

}