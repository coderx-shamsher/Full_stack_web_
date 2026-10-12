import { CreateUserQuery } from "../Database/Queries/CreateUserQuery.js";
import { CreateUserService } from "../Services/CreateUser.service.js";

export async function CreateUser(req,res,next) {
    const data = req.body
    CreateUserService(data,res,next)

}