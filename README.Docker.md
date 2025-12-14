# Docker Setup Guide

Hướng dẫn chạy ứng dụng HasakiClone bằng Docker.

## Yêu cầu

- Docker Engine 20.10+
- Docker Compose 2.0+

## Cấu trúc

- **Backend**: Laravel (PHP 8.2) - Port 8000
- **Frontend**: React + Vite - Port 3000 (production) hoặc 5173 (development)
- **Socket**: Node.js Socket.io - Port 3001
- **MySQL**: Database - Port 3306
- **Redis**: Cache & Queue - Port 6379

## Chạy Production

```bash
# Build và start tất cả services
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Stop tất cả services
docker-compose down

# Stop và xóa volumes (xóa dữ liệu)
docker-compose down -v
```

## Chạy Development

```bash
# Build và start với hot reload
docker-compose -f docker-compose.dev.yml up -d --build

# Xem logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down
```

## Environment Variables

Tạo file `.env` ở root hoặc set các biến môi trường:

```env
# Database
DB_DATABASE=hasaki
DB_USERNAME=hasaki
DB_PASSWORD=root

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SOCKET_URL=http://localhost:3001

# Ports
BACKEND_PORT=8000
FRONTEND_PORT=3000
SOCKET_PORT=3001

# Backend
RUN_SEEDERS=false
```

## Setup Backend

Sau khi containers đã chạy:

```bash
# Vào container backend
docker exec -it hasaki_backend bash

# Chạy migrations
php artisan migrate

# Chạy seeders (nếu cần)
php artisan db:seed

# Tạo APP_KEY nếu chưa có
php artisan key:generate
```

## URLs

- Frontend: http://localhost:3000 (production) hoặc http://localhost:5173 (dev)
- Backend API: http://localhost:8000/api
- Socket Server: http://localhost:3001

## Troubleshooting

### Backend không kết nối được database

Kiểm tra MySQL đã sẵn sàng:
```bash
docker-compose ps
docker-compose logs mysql
```

### Frontend không build được

Kiểm tra logs:
```bash
docker-compose logs frontend
```

### Clear cache

```bash
docker exec -it hasaki_backend php artisan cache:clear
docker exec -it hasaki_backend php artisan config:clear
```

