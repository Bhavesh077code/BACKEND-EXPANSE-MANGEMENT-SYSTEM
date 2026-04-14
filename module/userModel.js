import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
   
    emailOtp: { type: String },
    emailOtpExpiry: { type: Date },

    isVerified: { type: Boolean, default: false },

    monthlyLimit: {
        type: Number,
        default: 0,
        min: 0
    }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);