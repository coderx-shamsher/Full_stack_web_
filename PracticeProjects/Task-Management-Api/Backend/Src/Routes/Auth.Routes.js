import express from "express";
import { AuthUserController } from "../Controllers/AuthUser.Controller.js";
import { RefreshTokensController } from "../Controllers/RefreshTokens.Controller.js";


const AuthRouter = express.Router();

// api/auth/login
AuthRouter.post("/login", AuthUserController);

// /api/auth/refresh
AuthRouter.post("/refresh",RefreshTokensController);

export default AuthRouter;
