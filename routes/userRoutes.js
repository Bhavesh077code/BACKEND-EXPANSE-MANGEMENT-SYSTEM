import express from "express";
import { sendOtp } from "../controller/userController.js";
import { verifyOtp } from "../controller/verifyOtpController.js";


const router = express.Router();

router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp);


export default router;