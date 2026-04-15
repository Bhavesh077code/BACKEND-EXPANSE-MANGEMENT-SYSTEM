
/*
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
    origin: ["https://frontend-expanse-mangement-system.vercel.app/"],
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

*/



import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import dns from "dns";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { initSocketServer } from "./socket/server.js";

// DNS fix for MongoDB
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

/* -------------------- CORS CONFIG -------------------- */
const allowedOrigins = [
  "https://frontend-expanse-mangement-system.vercel.app",
  "http://localhost:5173",
  "http://192.168.1.67:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman or server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: Not allowed origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* IMPORTANT: Handle preflight requests */
app.options("*", cors());

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

/* -------------------- DATABASE -------------------- */
connectDB();

/* -------------------- SOCKET -------------------- */
const io = initSocketServer(server);
console.log("Socket.io initialized:", !!io);

/* -------------------- START SERVER -------------------- */
server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});