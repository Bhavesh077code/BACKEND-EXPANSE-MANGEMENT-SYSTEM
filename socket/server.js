/*
import { Server } from "socket.io";
let io;

export const initSocketServer = (server) => {
    if (io) return io;

    io = new Server(server, {
        cors: {
            origin: ["https://frontend-expanse-mangement-system.vercel.app/"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
       // console.log("Client connected:", socket.id);

        socket.on("joinRoom", (userId) => {
           // console.log("🔥 joinRoom called with:", userId);

            if (!userId) {
               // console.log("❌ userId missing — NOT joining room");
                return;
            }
            socket.join(userId);
            // console.log(` Socket ${socket.id} joined room ${userId}`);
        });
        socket.on("disconnect", () => {
           // console.log("Client disconnected:", socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
};


*/



import { Server } from "socket.io";

let io;

const allowedOrigins = [
  "https://frontend-expanse-mangement-system.vercel.app",
  "http://localhost:5173",
  "http://192.168.1.67:5173"
];

export const initSocketServer = (server) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Socket CORS blocked"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("joinRoom", (userId) => {
      if (!userId) {
        console.log("❌ joinRoom missing userId");
        return;
      }

      socket.join(userId);
      console.log(`📦 Socket ${socket.id} joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};