
import mongoose from "mongoose";
import { Expense } from "../module/expenseModel.js";

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }

        
        const expense = await Expense.findOneAndDelete({ _id: id, user: req.user._id });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Successfully Deleted" });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Delete error" });
    }
};