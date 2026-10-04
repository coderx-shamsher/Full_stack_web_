import { getProfileQuery } from "../Database/Queries/getProfileQuery.js";

export async function getProfile(req,res) {
    // console.log(req.body)
    console.log("REQ.USER:", req.User);

    const { userId} = req.body;
    
    console.log("USER REQUEST ID:", userId);
     
     // db cal here -> 
    getProfileQuery(userId,res)

}