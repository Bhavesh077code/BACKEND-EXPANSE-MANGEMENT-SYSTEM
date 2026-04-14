import express from "express";
import { sendOtp } from "../controller/userController.js";
import { verifyOtp } from "../controller/verifyOtpController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";


const router = express.Router();

router.post("/send-otp", rateLimit, sendOtp)
router.post("/verify-otp", rateLimit, verifyOtp);


export default router;