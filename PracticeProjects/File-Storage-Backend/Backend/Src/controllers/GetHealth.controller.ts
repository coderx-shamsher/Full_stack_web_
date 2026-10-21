import type { Request, Response } from "express";


export const getHealth = (req : Request, res : Response) =>{
 res.status(200).json({
    Succss : true,
    Message : "Backend health is ok || Running ...."
 })   
}