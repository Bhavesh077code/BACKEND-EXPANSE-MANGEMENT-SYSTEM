

import express from "express";
import "dotenv/config"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import cors from "cors";
import http from "http";



//MONGODB DNS CONFIGURATION
import dns from "dns";
import { initSocketServer } from "./socket/server.js";
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const server = http.createServer(app);



app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.use(cors({
    origin: [/\.vercel\.app$/] ,
    //origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.use("/user", userRoutes);
app.use("/expense", expenseRoutes)

//Connected Db
connectDB();
const io = initSocketServer(server);
console.log("Socket.io initialized:", !!io);


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})

