import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["Food", "Travel", "Bills", "Shopping", "Other"],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Esewa","Khalti", "MobileBanking"],
    default: "Cash"
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);