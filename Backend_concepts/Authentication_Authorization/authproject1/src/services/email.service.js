import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { google } from "googleapis";

// import { error } from "console";

// dotenv.config({
//     path : path.resolve(process.cwd(),'.env')
// })

dotenv.config({
  path: ".env",
});

// console.log(process.env.google_user_mail)
// console.log(process.env.google_RefreshToken)
// console.log(process.env.google_client_id)
// console.log(process.env.google_client_secret)

const oauth2Client = new google.auth.OAuth2(
  process.env.google_client_id,
  process.env.google_client_secret
);

oauth2Client.setCredentials({
  refresh_token: process.env.google_RefreshToken,
});

const { token } = await oauth2Client.getAccessToken();

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.google_user_mail,
    clientId: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    refreshToken: process.env.google_RefreshToken,
    accessToken : token
  },
});

// verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error Connection to mail server :", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const SendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.google_user_mail}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message send : %s", info.messageId);
    console.log("preview URL : %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Error sending mail:", error);
  }
};



