import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.google_client_id,
  process.env.google_client_secret
);

oauth2Client.setCredentials({
  refresh_token: process.env.google_RefreshToken,
});

try {
  const { token } = await oauth2Client.getAccessToken();

  console.log("Access Token Generated:", !!token);

  if (token) {
    console.log("✅ OAuth2 is working!");
  } else {
    console.log("❌ Access token was not generated");
  }
} catch (error) {
  console.error("❌ OAuth2 Error:");
  console.error(error.message);
}