const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // trong production bạn thay bằng domain thật
        methods: ["GET", "POST"]
    }
});

// Khi client kết nối
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); // broadcast lại cho tất cả client
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});

// API Laravel sẽ gọi route này
app.post("/send", (req, res) => {
    const message = req.body.message;
    console.log("Received from Laravel:", message);

    io.emit("message", message); // Gửi cho tất cả client
    return res.json({ status: "ok" });
});
