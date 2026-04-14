
import mongoose from "mongoose";
import { Notification } from "../module/notificationModel.js";

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid notification ID" });
        }

        const notification = await Notification.findOneAndDelete({ _id: id, user: req.user._id });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        return res.status(200).json({ message: "Successfully Deleted" });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Notification error" });
    }
};