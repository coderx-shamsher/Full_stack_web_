import { LookupUserForAuth } from "../Database/Queries/lookupForAuthUser.js"
export async function AuthUserController(req, res) {
    // console.log(req.body);
    const data = req.body

    // lookup user for auth -> 
    // db call function -> 
    LookupUserForAuth(data, res)

}