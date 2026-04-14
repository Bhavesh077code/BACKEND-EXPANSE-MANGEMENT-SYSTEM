
import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import { addExpense } from "../controller/expenseController.js";
import { getExpense } from "../controller/getExpenseController.js";
import { editExpense, getSingleExpense } from "../controller/editExpenseController.js";
import { getDashboard } from "../controller/dashbordController.js";
import { getNotifications } from "../controller/setNotificationController.js";
import { setMonthlyLimit } from "../controller/monthlyLimitcontroller.js";
import { deleteExpense } from "../controller/deleteExpenseController.js";
import { deleteNotification } from "../controller/deleteNotificationController.js";
import { apiLimiter } from "../middleware/rateLimitMiddleware.js";


const router= express.Router();

router.post("/create", authMiddleware, addExpense);
router.get("/get-create", authMiddleware, getExpense);
router.put("/edit/:id", authMiddleware, editExpense);
router.get("/edit/:id", authMiddleware, getSingleExpense);


router.get("/dashboard", authMiddleware, getDashboard);
router.get("/notification", authMiddleware, getNotifications);
router.put("/set-limit", authMiddleware, apiLimiter, setMonthlyLimit);
router.delete("/delete/:id", authMiddleware, deleteExpense);
router.delete("/delete/notification/:id", authMiddleware, deleteNotification);

export default router;