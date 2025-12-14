# HasakiClone Project

Dự án mã nguồn mở mô phỏng website thương mại điện tử Hasaki (Hasaki Clone). Dự án được xây dựng với kiến trúc **Monorepo** tách biệt giữa Frontend, Backend, Socket Server và n8n Workflow Automation.

**Tác giả:** Lê Văn Xuân Hoàn

## 📋 Mục lục

- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu môi trường](#️-yêu-cầu-môi-trường)
- [Cài đặt với Docker](#-cài-đặt-với-docker)
- [Cài đặt không dùng Docker](#-cài-đặt-không-dùng-docker)
- [Cấu hình](#-cấu-hình)
- [API Endpoints](#-api-endpoints)
- [Sử dụng Makefile](#-sử-dụng-makefile)
- [Troubleshooting](#-troubleshooting)

---

## 🛠 Công nghệ sử dụng

### 🔙 Backend (API)
- **Framework:** Laravel 12.x
- **Ngôn ngữ:** PHP >= 8.2
- **Database:** MySQL 8.0
- **Cache & Queue:** Redis 7
- **Authentication:** Laravel Sanctum
- **Payment:** Square Payment API
- **Real-time:** Laravel Broadcasting với Redis

### 🎨 Frontend (Client)
- **Framework:** React 19.x
- **Build Tool:** Vite 6.x
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI (MUI) 7.x
- **Styling:** TailwindCSS 4.x
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client & Laravel Echo
- **Rich Text Editor:** Tiptap
- **Charts:** ApexCharts
- **Internationalization:** react-i18next

### 🔌 Socket Server
- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Real-time:** Socket.io 4.x
- **CORS:** Enabled

### 🤖 n8n Workflow Automation
- **Platform:** n8n (latest)
- **Purpose:** Workflow automation cho AI review replies, order notifications, contact form processing

### 🗄️ Database & Infrastructure
- **Database:** MySQL 8.0
- **Cache/Queue:** Redis 7
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (Backend), Vite Dev Server (Frontend Dev)

---

## 📁 Cấu trúc dự án

```
HasakiClone/
├── backend/              # Laravel API Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/        # API Controllers
│   │   │   │   └── Auth/       # Authentication Controllers
│   │   │   ├── Resources/      # API Resources
│   │   │   └── Requests/       # Form Requests
│   │   ├── Models/             # Eloquent Models
│   │   ├── Events/             # Laravel Events
│   │   └── Mail/               # Mail Classes
│   ├── database/
│   │   ├── migrations/         # Database Migrations
│   │   └── seeders/            # Database Seeders
│   ├── routes/
│   │   ├── api.php            # API Routes
│   │   └── auth.php           # Authentication Routes
│   ├── Dockerfile             # Production Dockerfile
│   └── Dockerfile.dev         # Development Dockerfile
│
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── pages/             # Page Components
│   │   ├── store/             # Redux Store
│   │   ├── layouts/           # Layout Components
│   │   ├── router/            # React Router Config
│   │   └── assets/            # Static Assets
│   ├── Dockerfile
│   └── Dockerfile.dev
│
├── socket/              # Socket.io Server
│   ├── server.js       # Socket Server Entry Point
│   ├── Dockerfile
│   └── package.json
│
├── n8n/                 # n8n Workflow Automation
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml           # Production Docker Compose
├── docker-compose.dev.yml       # Development Docker Compose
├── Makefile                     # Make Commands
└── README.md                    # This file
```

---

## ⚙️ Yêu cầu môi trường

### Với Docker (Khuyến nghị)
- **Docker Engine** 20.10+
- **Docker Compose** 2.0+

### Không dùng Docker
- **Node.js** v16+ & **npm** hoặc **yarn**
- **PHP** >= 8.2 với các extensions cần thiết
- **Composer**
- **MySQL Server** 8.0+
- **Redis Server** 7+

---

## 🐳 Cài đặt với Docker

### 1. Clone repository

```bash
git clone <repository-url>
cd HasakiClone
```

### 2. Tạo file `.env` (tùy chọn)

Tạo file `.env` ở thư mục gốc để cấu hình các biến môi trường:

```env
# Database
DB_DATABASE=hasaki
DB_USERNAME=hasaki
DB_PASSWORD=root

# Ports
BACKEND_PORT=8000
FRONTEND_PORT=3000
SOCKET_PORT=3001
N8N_PORT=5678

# URLs
BACKEND_URL=http://localhost:8000
SOCKET_URL=http://localhost:3001

# n8n Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin
N8N_HOST=localhost
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678/

# Backend
RUN_SEEDERS=false
```

### 3. Chạy Production

```bash
# Build và start tất cả services
docker-compose up -d --build

# Hoặc sử dụng Makefile
make build
make up
```

### 4. Chạy Development (với hot reload)

```bash
# Build và start với hot reload
docker-compose -f docker-compose.dev.yml up -d --build

# Hoặc sử dụng Makefile
make dev
```

### 5. Setup Backend (Lần đầu tiên)

```bash
# Vào container backend
docker exec -it hasaki_backend bash
# hoặc (development)
docker exec -it hasaki_backend_dev bash

# Chạy migrations
php artisan migrate

# Chạy seeders (nếu cần)
php artisan db:seed

# Tạo APP_KEY nếu chưa có
php artisan key:generate

# Clear cache
php artisan config:clear
php artisan cache:clear
```

### 6. Truy cập ứng dụng

- **Frontend:** http://localhost:3000 (production) hoặc http://localhost:5173 (development)
- **Backend API:** http://localhost:8000/api
- **Socket Server:** http://localhost:3001
- **n8n:** http://localhost:5678

---

## 💻 Cài đặt không dùng Docker

### 1. Setup Backend (Laravel)

```bash
cd backend

# Cài đặt dependencies
composer install

# Tạo file .env
cp .env.example .env

# Tạo Application Key
php artisan key:generate

# Cấu hình database trong .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=hasaki
# DB_USERNAME=root
# DB_PASSWORD=

# Chạy migrations
php artisan migrate

# Chạy seeders (nếu cần)
php artisan db:seed

# Start Laravel server
php artisan serve
```

### 2. Setup Frontend (React)

```bash
cd frontend

# Cài đặt dependencies
npm install

# Cấu hình .env hoặc .env.local
# VITE_BACKEND_URL=http://localhost:8000/api
# VITE_SOCKET_URL=http://localhost:3001

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

### 3. Setup Socket Server

```bash
cd socket

# Cài đặt dependencies
npm install

# Start server
node server.js
```

### 4. Setup n8n

```bash
# Cài đặt n8n globally
npm install -g n8n

# Start n8n
n8n start
```

---

## ⚙️ Cấu hình

### Backend Environment Variables

Cấu hình trong `backend/.env`:

```env
APP_NAME=HasakiClone
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql  # hoặc 127.0.0.1 nếu không dùng Docker
DB_PORT=3306
DB_DATABASE=hasaki
DB_USERNAME=hasaki
DB_PASSWORD=root

REDIS_HOST=redis  # hoặc 127.0.0.1 nếu không dùng Docker
REDIS_PORT=6379

BROADCAST_DRIVER=redis
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

### Frontend Environment Variables

Cấu hình trong `frontend/.env` hoặc `frontend/.env.local`:

```env
VITE_BACKEND_URL=http://localhost:8000/api
VITE_SOCKET_URL=http://localhost:3001
```

### Socket Server

Cấu hình trong `socket/laravel-echo-server.json` hoặc environment variables:

```env
PORT=3001
NODE_ENV=production  # hoặc development
```

### n8n Configuration

Cấu hình trong `docker-compose.yml` hoặc environment variables:

```env
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678/
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập
- `POST /api/register` - Đăng ký
- `POST /api/logout` - Đăng xuất (yêu cầu auth)
- `GET /api/user` - Lấy thông tin user hiện tại (yêu cầu auth)
- `POST /api/verify-email` - Gửi mã xác thực email

### Products
- `GET /api/products` - Danh sách sản phẩm (có pagination, search)
- `GET /api/products/{id}` - Chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/{id}` - Cập nhật sản phẩm
- `DELETE /api/products/{id}` - Xóa sản phẩm

### Categories
- `GET /api/categories` - Danh sách danh mục
- `GET /api/categories/{id}` - Chi tiết danh mục
- `GET /api/categories-children` - Lấy danh mục con

### Brands
- `GET /api/brands` - Danh sách thương hiệu
- `GET /api/brands/{id}` - Chi tiết thương hiệu

### Cart (Yêu cầu auth)
- `GET /api/carts` - Lấy giỏ hàng
- `POST /api/carts` - Thêm vào giỏ hàng
- `PUT /api/carts/{id}` - Cập nhật giỏ hàng
- `DELETE /api/carts/{id}` - Xóa khỏi giỏ hàng

### Orders (Yêu cầu auth)
- `GET /api/orders` - Danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/{id}` - Chi tiết đơn hàng

### Addresses (Yêu cầu auth)
- `GET /api/addresses` - Danh sách địa chỉ
- `POST /api/addresses` - Thêm địa chỉ mới
- `PUT /api/addresses/{id}` - Cập nhật địa chỉ
- `DELETE /api/addresses/{id}` - Xóa địa chỉ

### Reviews
- `GET /api/reviews` - Danh sách đánh giá
- `POST /api/reviews` - Tạo đánh giá mới
- `POST /api/reviews/ai-reply` - Lưu phản hồi AI

### Deals & Discounts
- `GET /api/hot-deals` - Danh sách hot deals
- `GET /api/flash-deals` - Danh sách flash deals
- `GET /api/discount-codes` - Danh sách mã giảm giá

### Payment
- `POST /api/payments` - Xử lý thanh toán

### Location
- `GET /api/list_cities` - Danh sách tỉnh/thành phố

### Contact
- `POST /api/contact` - Gửi liên hệ (tích hợp n8n webhook)

### Users
- `GET /api/users` - Danh sách users
- `GET /api/users/{id}` - Chi tiết user

---

## 🔧 Sử dụng Makefile

Dự án có sẵn Makefile với các lệnh tiện ích:

```bash
# Xem tất cả commands
make help

# Build Docker images
make build

# Start production services
make up

# Start development services (với hot reload)
make dev

# Stop tất cả services
make down

# Xem logs
make logs

# Restart services
make restart

# Clean (stop và xóa containers, volumes)
make clean

# Mở shell trong backend container
make shell-backend

# Mở shell trong frontend container
make shell-frontend

# Mở shell trong socket container
make shell-socket
```

---

## 🔍 Troubleshooting

### Backend không kết nối được database

```bash
# Kiểm tra MySQL container
docker-compose ps
docker-compose logs mysql

# Kiểm tra kết nối từ backend container
docker exec -it hasaki_backend bash
mysql -h mysql -u hasaki -p
```

### Frontend không build được

```bash
# Kiểm tra logs
docker-compose logs frontend

# Xóa node_modules và rebuild
docker exec -it hasaki_frontend sh
rm -rf node_modules
npm install
```

### Clear cache Laravel

```bash
docker exec -it hasaki_backend php artisan cache:clear
docker exec -it hasaki_backend php artisan config:clear
docker exec -it hasaki_backend php artisan route:clear
docker exec -it hasaki_backend php artisan view:clear
```

### Socket không hoạt động

```bash
# Kiểm tra logs
docker-compose logs socket

# Kiểm tra port
netstat -an | grep 3001
```

### Permission issues

```bash
# Fix permissions cho Laravel storage
docker exec -it hasaki_backend chmod -R 775 storage bootstrap/cache
docker exec -it hasaki_backend chown -R www-data:www-data storage bootstrap/cache
```

### Database migration errors

```bash
# Reset database (CẨN THẬN: Xóa toàn bộ dữ liệu)
docker exec -it hasaki_backend php artisan migrate:fresh

# Hoặc rollback và migrate lại
docker exec -it hasaki_backend php artisan migrate:rollback
docker exec -it hasaki_backend php artisan migrate
```

### n8n không truy cập được

```bash
# Kiểm tra logs
docker-compose logs n8n

# Kiểm tra basic auth credentials
# Mặc định: admin/admin (có thể thay đổi trong .env)
```

---

## 📝 Ghi chú

- **Dữ liệu persistent:** Tất cả dữ liệu (database, cache, n8n workflows) được lưu trong Docker volumes và không bị mất khi container restart
- **Development mode:** Sử dụng `docker-compose.dev.yml` để có hot reload cho frontend và backend
- **Production mode:** Sử dụng `docker-compose.yml` với build tối ưu cho production
- **n8n Integration:** n8n được tích hợp để xử lý workflows tự động như AI review replies, order notifications, contact form processing

---

## 📄 License

MIT License

---

## 👥 Contributors

**Tác giả chính:**
- Lê Văn Xuân Hoàn

Dự án mã nguồn mở - đóng góp welcome!

---

## 🔗 Links

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Socket.io Documentation](https://socket.io/docs)
- [n8n Documentation](https://docs.n8n.io)
- [Docker Documentation](https://docs.docker.com)
