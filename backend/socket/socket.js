import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*", // Allow connections from any device
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // userId => socketId

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	console.log("✅ Connected:", socket.id, "| UserID:", userId);

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("❌ Disconnected:", socket.id);

		if (userId) delete userSocketMap[userId];

		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };