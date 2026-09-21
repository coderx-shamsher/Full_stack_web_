export function genOTP(){
    return Math.floor(928230 + Math.random() * 90292900).toString()
}


export function htmlparser(otp){
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8;">

  <!-- Main Container -->
  <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden; padding: 32px;">
    
    <!-- Header/Logo -->
    <div style="font-size: 24px; font-weight: bold; color: #1a1a1a; margin-bottom: 24px; text-align: center;">
      From auth-system-backend by coderx
    </div>
    
    <!-- Body Content -->
    <h2 style="font-size: 20px; font-weight: 600; color: #333333; margin: 0 0 16px 0;">Verify your identity</h2>
    
    <p style="font-size: 15px; line-height: 24px; color: #555555; margin: 0 0 24px 0;">Hello,</p>
    
    <p style="font-size: 15px; line-height: 24px; color: #555555; margin: 0 0 24px 0;">
      Use the verification code below to complete your sign-in or transaction. This code is valid for <strong>10 minutes</strong>.
    </p>
    
    <!-- OTP Display Box -->
    <h2>Verify with this OTP </h2>
    <div style="background-color: #f1f5f9; border-radius: 6px; padding: 16px; text-align: center; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #2563eb; font-family: monospace; margin-bottom: 24px;">
      ${otp}
    </div>
    
    <p style="font-size: 13px; line-height: 20px; color: #777777; margin: 0 0 32px 0;">
      If you did not request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.
    </p>
    
    <!-- Footer -->
    <div style="border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center; font-size: 12px; color: #999999; line-height: 18px;">
      &copy; 2026 Your Company Inc. All rights reserved.<br>
      123 Innovation Way, Tech City, CA 94016
    </div>

  </div>

</body>
</html>
`
}

