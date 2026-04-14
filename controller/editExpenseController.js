
import mongoose from "mongoose";
import { Expense } from "../module/expenseModel.js";
import { getIO } from "../socket/server.js";

export const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, paymentMethod, description } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await Expense.findOne({ _id: id, user: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.paymentMethod = paymentMethod ?? expense.paymentMethod;
    expense.description = description ?? expense.description;

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense
    });

   
    try {
      const io = getIO();

      const roomId = expense.user.toString();

      const clients = io.sockets.adapter.rooms.get(roomId);

      if (!clients || clients.size === 0) {
        console.log("⚠️ No users in this room!");
      }

      io.to(roomId).emit("editExpense", {
        message: "✏️ Expense updated successfully",
        expense
      });

    } catch (err) {
      console.log("❌ Socket emit error:", err.message);
    }

  } catch (error) {
    console.error("❌ Edit Expense Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await Expense.findOne({ _id: id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.error("Get Single Expense Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};