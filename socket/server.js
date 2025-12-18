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

// Endpoint để nhận thông báo đơn hàng mới
app.post("/notify-new-order", (req, res) => {
    const { order, event } = req.body;
    console.log("📦 Đơn hàng mới:", order?.id || order?.orderId);

    // Gửi thông báo đến admin với event type
    io.emit("new_order", {
        event: event || "new_order",
        order: order,
        message: `Đơn hàng mới #${order?.id || order?.orderId || 'N/A'} từ ${order?.user?.first_name || ''} ${order?.user?.last_name || ''}`,
        timestamp: new Date().toISOString()
    });

    // Cũng gửi đến channel chung để cập nhật danh sách
    io.emit("orders_updated", {
        event: "orders_updated",
        orderId: order?.id,
        action: "created"
    });

    return res.json({ status: "ok", message: "Order notification sent" });
});

// Endpoint để nhận thông báo CRUD Products
app.post("/notify-products", (req, res) => {
    const { action, product } = req.body;
    console.log(`🛍️ Product ${action}:`, product?.id || product?.name);

    io.emit("products_updated", {
        event: "products_updated",
        action: action, // created, updated, deleted
        product: product,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Product notification sent" });
});

// Endpoint để nhận thông báo CRUD Categories
app.post("/notify-categories", (req, res) => {
    const { action, category } = req.body;
    console.log(`📁 Category ${action}:`, category?.id || category?.name);

    io.emit("categories_updated", {
        event: "categories_updated",
        action: action, // created, updated, deleted
        category: category,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Category notification sent" });
});

// Endpoint để nhận thông báo CRUD Brands
app.post("/notify-brands", (req, res) => {
    const { action, brand } = req.body;
    console.log(`🏷️ Brand ${action}:`, brand?.id || brand?.name);

    io.emit("brands_updated", {
        event: "brands_updated",
        action: action, // created, updated, deleted
        brand: brand,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Brand notification sent" });
});

// Endpoint để nhận thông báo CRUD Hot Deals
app.post("/notify-hot-deals", (req, res) => {
    const { action, hotDeal } = req.body;
    console.log(`🔥 Hot Deal ${action}:`, hotDeal?.id || hotDeal?.name);

    io.emit("hot_deals_updated", {
        event: "hot_deals_updated",
        action: action, // created, updated, deleted
        hotDeal: hotDeal,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Hot Deal notification sent" });
});

// Endpoint để nhận thông báo CRUD Flash Deals
app.post("/notify-flash-deals", (req, res) => {
    const { action, flashDeal } = req.body;
    console.log(`⚡ Flash Deal ${action}:`, flashDeal?.id);

    io.emit("flash_deals_updated", {
        event: "flash_deals_updated",
        action: action, // created, updated, deleted
        flashDeal: flashDeal,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Flash Deal notification sent" });
});

// Endpoint để nhận thông báo CRUD Discount Codes
app.post("/notify-discount-codes", (req, res) => {
    const { action, discountCode } = req.body;
    console.log(`🎫 Discount Code ${action}:`, discountCode?.id || discountCode?.code);

    io.emit("discount_codes_updated", {
        event: "discount_codes_updated",
        action: action, // created, updated, deleted
        discountCode: discountCode,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "Discount Code notification sent" });
});

// ========================
// 2️⃣ SOCKET.IO
// ========================
// Lưu trữ mapping giữa userId và socketId
const userSockets = new Map(); // userId -> Set of socketIds

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // User join vào room của mình khi kết nối (gửi userId từ client)
    socket.on("join_user_room", (data) => {
        const userId = data.userId;
        if (userId) {
            socket.join(`user_${userId}`);
            console.log(`User ${userId} joined room: user_${userId}`);
            
            // Lưu mapping
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId).add(socket.id);
        }
    });

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        
        // Xóa socket khỏi mapping
        for (const [userId, socketIds] of userSockets.entries()) {
            if (socketIds.has(socket.id)) {
                socketIds.delete(socket.id);
                if (socketIds.size === 0) {
                    userSockets.delete(userId);
                }
                break;
            }
        }
    });
});

// Endpoint để gửi notification đến user cụ thể
app.post("/notify-user-order", (req, res) => {
    const { userId, order, event, message } = req.body;
    console.log(`📧 Order notification to user ${userId}:`, order?.id || order?.orderId);

    // Gửi đến room của user cụ thể
    io.to(`user_${userId}`).emit("order_processed", {
        event: event || "order_processed",
        order: order,
        message: message || `Đơn hàng #${order?.id || order?.orderId || 'N/A'} đã được xác nhận!`,
        timestamp: new Date().toISOString()
    });

    return res.json({ status: "ok", message: "User order notification sent" });
});

// ========================
// 3️⃣ BẮT SERVER CUỐI CÙNG
// ========================
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
