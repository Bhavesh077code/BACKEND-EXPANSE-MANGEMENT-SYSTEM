

import { Notification } from "../module/notificationModel.js";
import { User } from "../module/userModel.js";
import { getIO } from "../socket/server.js";

export const setMonthlyLimit = async (req, res) => {
  try {
    const { monthlyLimit } = req.body;

    // Validation
    if (monthlyLimit == null || monthlyLimit < 0) {
      return res.status(400).json({ message: "Valid monthly limit required" });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { monthlyLimit },
      { new: true }
    ).select("-password");

    // Create notification
    const notification = await Notification.create({
      user: user._id,
      message: `📊 Monthly limit set to ₹${monthlyLimit}`
    });

    // Emit via socket to user's room
    try {
      const io = getIO();

      // Make sure client joined the room with user._id
      io.to(user._id.toString()).emit("newNotification", {
        message: notification.message
      });

      io.to(user._id.toString()).emit("limitUpdated", {
        message: "Monthly limit updated",
        monthlyLimit
      });

    } catch (err) {
      console.log("⚠ Socket not ready:", err.message);
    }

    // Response
    res.status(200).json({
      message: "Monthly limit updated successfully",
      monthlyLimit: user.monthlyLimit
    });
  } catch (error) {
    console.error("Set Monthly Limit Error:", error);
    res.status(500).json({ message: error.message || "Error updating monthly limit" });
  }
};
