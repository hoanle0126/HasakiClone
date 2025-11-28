import Echo from 'laravel-echo';
import { io } from "socket.io-client";

// Đảm bảo thư viện Socket.IO Client được gán vào window.io
window.io = io;

// Khởi tạo đối tượng Echo
const echo = new Echo({
    broadcaster: 'socket.io',
    // ⚠️ QUAN TRỌNG: Host phải khớp với PORT và PROTOCOL trong laravel-echo-server.json
    host: 'http://localhost:8888', 
    // Nếu bạn dùng Private Channel, cần thêm auth headers để xác thực
    // auth: {
    //     headers: {
    //         Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    //     },
    // },
});

export default echo;