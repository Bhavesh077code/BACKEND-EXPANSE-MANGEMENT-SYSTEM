
/*
import nodemailer from "nodemailer";
import "dotenv/config"

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

transporter.verify((error, success) => {
  if (error) {
    console.log("email connection error")
  } else {
    console.log("Ready to send otp in the email")
  }
});

//EMAIL_PASS=dmuh pnmb qmah txrx
//EMAIL_USER=ydvbhavesh5@gmail.com


export const sendOtpToEmail = async (email, otp) => {

  const html = `
<div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
">

  <!-- Circular Logo -->
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" 
       alt="Logo" 
       style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;" />

  <h2 style="color: #333;">Verify Your Account</h2>
  <p style="color: #555; font-size: 16px;">
    Use the OTP below to verify your email address. 
    This code is valid for <strong>10 minutes</strong>.
  </p>

  <!-- OTP Box -->
  <div style="
      display: inline-block;
      padding: 15px 25px;
      margin: 20px 0;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 5px;
      background-color: #4CAF50;
      color: white;
      border-radius: 5px;
  ">
    ${otp}
  </div>

  <p style="color: #888; font-size: 14px;">
    If you did not request this code, please ignore this email.
  </p>

  <!-- Bottom Thin Banner Strip -->
  <div style="
      width: 100%;
      max-width: 600px;
      height: 40px;
      margin-top: 20px;
      background-image: url('https://static.vecteezy.com/system/resources/thumbnails/025/503/440/small/modern-futuristic-dark-background-abstract-futuristic-background-with-modern-shape-techology-futuristic-background-generative-ai-illustration-photo.jpg');
      background-size: cover;
      background-position: center;
      border-radius: 5px;
  "></div>

</div>
`;

  await transporter.sendMail({
    from: `email@ExpanseTracker.com <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "User Access Verification",
    html
  })
}

*/




import { Resend } from "resend";
import "dotenv/config"; 

// Initialize Resend 
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("Resend initialized with API key:", process.env.RESEND_API_KEY ? "Yes" : "No");

// NO CHANGE needed in your controller logic
export const sendOtpToEmail = async (email, otp) => {

  const html = `
  <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
      text-align: center;
  ">

    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" 
         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;" />

    <h2 style="color: #333;">Verify Your Account</h2>

    <p style="color: #555; font-size: 16px;">
      Use the OTP below to verify your email address.
      This code is valid for <strong>10 minutes</strong>.
    </p>

    <div style="
        display: inline-block;
        padding: 15px 25px;
        margin: 20px 0;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 5px;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
    ">
      ${otp}
    </div>

    <p style="color: #888; font-size: 14px;">
      If you did not request this code, please ignore this email.
    </p>

    <div style="
        width: 100%;
        max-width: 600px;
        height: 40px;
        margin-top: 20px;
        background-image: url('https://static.vecteezy.com/system/resources/thumbnails/025/503/440/small/modern-futuristic-dark-background-abstract-futuristic-background-with-modern-shape-techology-futuristic-background-generative-ai-illustration-photo.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 5px;
    "></div>

  </div>
  `;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "User Access Verification",
      html: html
    });

  } catch (error) {
    console.log("Email send error:", error);
    throw new Error("Failed to send OTP email");
  }
};
