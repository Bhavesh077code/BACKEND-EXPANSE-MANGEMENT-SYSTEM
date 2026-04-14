
/*
import { User } from "../module/userModel.js";
import { sendOtpToEmail } from "../service/emailOtpProvider.js";
import { generateOtp } from "../utils/otpGenerator.js";

//SEND OTP
export const sendOtp = async (req, res) => {
    try {
        const { email, username } = req.body;

       
        if (!email || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const otp = generateOtp();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        let user = await User.findOne({ email });

       
        
        if (!user) {
            user = new User({
                username,
                email,
            });
        } 

        user.emailOtp = String(otp);
        user.emailOtpExpiry = expiry;
        user.isVerified = false;

        await user.save();

        await sendOtpToEmail(email, otp);

        return res.status(200).json({
            message: "OTP sent successfully to your email",
            email: user.email
        });

    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

*/

import { User } from "../module/userModel.js";
import { sendOtpToEmail } from "../service/emailOtpProvider.js";
import { generateOtp } from "../utils/otpGenerator.js";

// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optional: simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check for existing user by email
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username, email });
    } else if (user.username !== username) {
      // Prevent username mismatch for same email
      return res.status(400).json({ message: "Email already registered with a different username" });
    }

    const otp = generateOtp(); 
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailOtp = String(otp);
    user.emailOtpExpiry = expiry;
    user.isVerified = false;

    await user.save();

    // Send OTP email
    try {
      await sendOtpToEmail(email, otp);
    } catch (err) {
      console.error("Failed to send OTP email:", err);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({
      message: "OTP sent successfully to your email",
      user: {
        email: user.email,
        _id: user._id
      }
    });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};