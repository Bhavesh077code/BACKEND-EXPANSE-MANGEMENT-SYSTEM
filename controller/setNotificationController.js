
/*
import { Notification } from "../module/notificationModel.js";


export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .sort({ createdAt: -1 }); 

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message || "Notifications Error" });
    }
};

*/


import { Notification } from "../module/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const notifications = await Notification.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            total: notifications.length,
            notifications
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Notifications Error"
        });
    }
};