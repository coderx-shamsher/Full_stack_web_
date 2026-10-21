import { Router } from "express";
import { getHealth } from "../controllers/GetHealth.controller.js";


const getHealthRouter = Router(); 

getHealthRouter.get('/backend',getHealth)


export default getHealthRouter