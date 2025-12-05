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
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ========================
// 1️⃣ ĐẶT ROUTE TRƯỚC listen
// ========================
app.post('/notify-new-review', (req, res) => {
    const {product_id,data} = req.body;
    console.log('📢 Review mới cho SP:', data+product_id);

    io.emit("product_"+product_id, data);

    return res.json({ status: 'ok' });
});

app.post("/sends", (req, res) => {
    const message = req.body;
    console.log("Received from Laravel:", message);

    io.emit("message", message);

    return res.json({ status: "ok" });
});

// ========================
// 2️⃣ SOCKET.IO
// ========================
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// ========================
// 3️⃣ BẮT SERVER CUỐI CÙNG
// ========================
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
