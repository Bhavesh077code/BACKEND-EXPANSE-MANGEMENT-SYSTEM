
import { Expense } from "../module/expenseModel.js";
import { Notification } from "../module/notificationModel.js";
import { getIO } from "../socket/server.js";

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, paymentMethod, description, date } = req.body;
        const user = req.user;

        // 1️⃣ Validation
        if (!title || !amount || !category) {
            return res.status(400).json({ message: "Title, amount and category are required" });
        }

        const expenseAmount = Number(amount);

        if (isNaN(expenseAmount) || expenseAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        // Monthly limit check
        if (user.monthlyLimit > 0) {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const total = await Expense.aggregate([
                { $match: { user: user._id, createdAt: { $gte: start, $lte: end } } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const spent = total[0]?.total || 0;
            const newTotal = spent + expenseAmount;

            if (newTotal >= user.monthlyLimit * 0.8 && newTotal <= user.monthlyLimit) {
                await Notification.create({
                    user: user._id,
                    message: "⚠ You have used 80% of your monthly limit!"
                });
            }

            if (newTotal > user.monthlyLimit) {

                await Notification.create({
                    user: user._id,
                    message: `Dear ${user.username}, your monthly limit exceeded!`
                });

                return res.status(400).json({
                    message: "Monthly limit exceeded!",
                    spent,
                    limit: user.monthlyLimit
                });
            }
        }

        // Save expense
        const expense = new Expense({
            title,
            amount,
            category,
            paymentMethod: paymentMethod || "Cash",
            description,
            date: date || Date.now(),
            user: user._id,
        });

        await expense.save();

        // SOCKET 
        try {
            const io = getIO();
            const roomId = user._id.toString();
            // CHECK WHO IS CONNECTED
            const roomClients = io.sockets.adapter.rooms.get(roomId);

            if (!roomClients || roomClients.size === 0) {
                console.log("⚠️ WARNING: No clients joined this room!");
            }

            io.to(roomId).emit("newExpense", {
                message: "New Expense Created",
                expense
            });

        } catch (err) {
            console.log("❌ Socket error:", err.message);
        }

        return res.status(201).json({
            message: "Expense added successfully",
            expense
        });

    } catch (error) {
        console.error("❌ Add Expense Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

