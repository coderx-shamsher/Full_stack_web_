import express from "express";
import { AuthUserController } from "../Controllers/AuthUser.Controller.js";
import { RefreshTokensController } from "../Controllers/RefreshTokens.Controller.js";
import { authLimiter } from "../Middlewares/ratelimit.middleware.js";


const AuthRouter = express.Router();

// api/auth/login
AuthRouter.post("/login",authLimiter, AuthUserController);

// /api/auth/refresh
AuthRouter.post("/refresh",authLimiter,RefreshTokensController);

export default AuthRouter;
