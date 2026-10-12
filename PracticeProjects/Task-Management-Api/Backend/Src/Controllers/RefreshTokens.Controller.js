import { RefreshTokens } from "../Services/Auth.RefreshAccess.service.js";
export function RefreshTokensController(req, res,next) {
  
    try {

        const refreshtoken = req.cookies.RefreshToken;

        console.log("\nRefresh token ->\n");
        console.log(refreshtoken);
        console.log("\n------ end ------\n");

        if (!refreshtoken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token required",
            });
        }

        const newtokens = RefreshTokens(refreshtoken);

        console.log("New tokens generated");

        // New Access Token
        res.cookie("AccessToken", newtokens.access, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
        });

        // New Refresh Token
        res.cookie("RefreshToken", newtokens.refresh, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
        });

    } catch (error) {
  error.context = {
      controller: "RefreshTokens.Controller.js",
      file: "RefreshTokens.Controller.js",
      function: "RefreshTokensController ()",
      operation: "Auth | Refresh Tokens  |  Failed !! ",
      layer: "BackEnd  Auth | Tokens  ",
    };
    next(error);
    }

}
