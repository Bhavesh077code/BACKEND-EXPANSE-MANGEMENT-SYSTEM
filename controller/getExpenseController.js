

import { Expense } from "../module/expenseModel.js";


export const getExpense = async (req, res) => {
    try {
        const expense = await Expense.find({ user: req.user._id })

        return res.status(200).json({
            success: true,
            message: "Get All Expense Successfully",
            expense
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "GetExpense Error"
        });
    };
};

