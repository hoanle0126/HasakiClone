# CHƯƠNG 4: TRIỂN KHAI ỨNG DỤNG TRÊN NỀN TẢNG ĐIỆN TOÁN ĐÁM MÂY

## 4.1. Triển khai Backend lên Railway Cloud Platform

### 4.1.1. Tạo Web Service trên Railway

**Các bước thực hiện:**

1. Truy cập trang web https://railway.app và đăng nhập vào tài khoản (hoặc đăng ký nếu chưa có).
2. Tại Dashboard, chọn **New Project** và chọn **Deploy from GitHub repo**.
3. Kết nối với repository GitHub chứa mã nguồn backend của dự án.
4. Chọn repository và branch cần deploy (thường là `main` hoặc `master`).
5. Railway sẽ tự động phát hiện Dockerfile và cấu hình build từ Docker image.

### 4.1.2. Cấu hình Build và Deploy

**Cấu hình cơ bản:**

- **Name:** `hasaki-backend` (hoặc tên tùy chọn)
- **Source:** GitHub repository
- **Root Directory:** `backend/` (thư mục chứa backend)
- **Dockerfile:** Railway tự động phát hiện `backend/Dockerfile`
- **Build Command:** Tự động build Docker image
- **Start Command:** Tự động chạy container từ Docker image
- **Plan:** Chọn Starter plan (hoặc Pro nếu cần)

**Dockerfile Backend:**
- Base image: `php:8.2-fpm`
- Cài đặt Nginx và PHP extensions (pdo_mysql, mbstring, exif, pcntl, bcmath, gd)
- Cài đặt Composer
- Copy và install dependencies
- Cấu hình Nginx
- Expose port 80

### 4.1.3. Thêm biến môi trường (Environment Variables)

**Các biến môi trường cần thiết:**

```
APP_NAME=HasakiClone
APP_ENV=production
APP_DEBUG=false
APP_URL=https://hasaki-backend.railway.app

# Database Master
DB_CONNECTION=mysql
DB_HOST=<railway-mysql-master-host>
DB_PORT=3306
DB_DATABASE=hasaki
DB_USERNAME=<railway-mysql-username>
DB_PASSWORD=<railway-mysql-password>

# Database Slave
DB_SLAVE_HOST=<railway-mysql-slave-host>
DB_SLAVE_PORT=3306
DB_SLAVE_DATABASE=hasaki
DB_SLAVE_USERNAME=<railway-mysql-slave-username>
DB_SLAVE_PASSWORD=<railway-mysql-slave-password>

# Redis
REDIS_HOST=<railway-redis-host>
REDIS_PORT=6379
REDIS_PASSWORD=<railway-redis-password>

# Broadcasting & Queue
BROADCAST_DRIVER=redis
QUEUE_CONNECTION=redis
CACHE_DRIVER=redis
SESSION_DRIVER=redis

# Laravel Sanctum
SANCTUM_STATEFUL_DOMAINS=<frontend-domain>

# Socket Server
SOCKET_URL=https://hasaki-socket.railway.app

# Square Payment API
SQUARE_APPLICATION_ID=<square-app-id>
SQUARE_ACCESS_TOKEN=<square-access-token>
SQUARE_ENVIRONMENT=production

# n8n Webhooks
N8N_WEBHOOK_URL=<n8n-webhook-url>

# Laravel Key
APP_KEY=base64:<laravel-app-key>
```

### 4.1.4. Kết nối MySQL Database trên Railway

**Các bước kết nối:**

1. **Tạo MySQL Master Database:**
   - Trong Railway project, chọn **New** → **Database** → **MySQL**
   - Chọn plan phù hợp (Starter hoặc Pro)
   - Railway tự động tạo MySQL instance và cung cấp connection string
   - Lưu các thông tin: `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`

2. **Tạo MySQL Slave Database:**
   - Tạo MySQL instance thứ hai trên Railway
   - Cấu hình Master-Slave replication giữa 2 instances
   - Lưu connection string cho Slave database

3. **Cấu hình trong Laravel:**
   - Thêm connection strings vào environment variables
   - Laravel sử dụng trait `SyncsToSlaveDatabase` để tự động sync dữ liệu sang Slave
   - Chạy migrations trên Master database, tự động sync sang Slave

4. **Chạy Migrations:**
   ```bash
   php artisan migrate --force
   ```

### 4.1.5. Thiết lập CI/CD với GitHub

**Cách hoạt động:**

- Sau khi kết nối repository, Railway sẽ tự động theo dõi branch đã chọn
- Mỗi khi có commit mới được push lên GitHub, Railway sẽ tự động:
  - Pull code mới nhất
  - Build Docker image từ Dockerfile
  - Deploy container mới
  - Health check và restart service nếu cần
- Có thể xem logs và trạng thái deploy realtime trên Dashboard của Railway
- Railway hỗ trợ zero-downtime deployment với rolling updates

## 4.2. Triển khai Socket Server lên Railway

### 4.2.1. Tạo Web Service cho Socket Server

**Các bước thực hiện:**

1. Trong cùng Railway project, chọn **New** → **Deploy from GitHub repo**
2. Chọn cùng repository nhưng root directory là `socket/`
3. Railway tự động phát hiện `socket/Dockerfile`

**Cấu hình:**
- **Name:** `hasaki-socket`
- **Root Directory:** `socket/`
- **Dockerfile:** Tự động phát hiện
- **Port:** 3001

**Dockerfile Socket Server:**
- Base image: `node:20-alpine`
- Install dependencies từ `package.json`
- Copy source code
- Expose port 3001
- Start command: `node server.js`

### 4.2.2. Cấu hình Environment Variables

```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=<frontend-domain>
```

### 4.2.3. Kết nối với Backend

- Backend gửi HTTP requests đến Socket Server qua endpoint `/notify-new-order`, `/notify-products`, etc.
- Socket Server emit events qua Socket.io đến Frontend clients

## 4.3. Triển khai Frontend lên Vercel

### 4.3.1. Kết nối Repository với Vercel

**Các bước thực hiện:**

1. Truy cập https://vercel.com và đăng nhập (hoặc đăng ký)
2. Tại Dashboard, chọn **Add New Project**
3. Import repository GitHub chứa mã nguồn frontend
4. Chọn repository và branch cần deploy

### 4.3.2. Cấu hình Build Settings

**Cấu hình cơ bản:**

- **Framework Preset:** Vite
- **Root Directory:** `frontend/` (hoặc để trống nếu frontend ở root)
- **Build Command:** `npm run build` (hoặc `cd frontend && npm run build`)
- **Output Directory:** `dist` (hoặc `frontend/dist`)
- **Install Command:** `npm install` (hoặc `cd frontend && npm install`)

### 4.3.3. Cấu hình Environment Variables

**Các biến môi trường cần thiết:**

```
VITE_BACKEND_URL=https://hasaki-backend.railway.app/api
VITE_SOCKET_URL=https://hasaki-socket.railway.app
```

**Lưu ý:** Vite yêu cầu prefix `VITE_` cho các biến môi trường để expose ra client-side.

### 4.3.4. Cấu hình Vercel.json

File `vercel.json` trong frontend:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Cấu hình này đảm bảo React Router hoạt động đúng với SPA (Single Page Application).

### 4.3.5. Thiết lập CI/CD với GitHub

**Cách hoạt động:**

- Vercel tự động theo dõi branch đã chọn
- Mỗi khi có commit mới được push lên GitHub, Vercel sẽ tự động:
  - Pull code mới nhất
  - Install dependencies
  - Build production bundle với Vite
  - Deploy lên CDN toàn cầu
  - Tự động cấp SSL certificate
- Mỗi commit tạo một preview deployment
- Merge vào main branch tạo production deployment
- Có thể xem logs và analytics trên Vercel Dashboard

### 4.3.6. Custom Domain (Tùy chọn)

- Vercel cho phép thêm custom domain miễn phí
- Tự động cấp SSL certificate qua Let's Encrypt
- Hỗ trợ DNS configuration

## 4.4. Phân tích các thuộc tính Cloud của hệ thống

### 4.4.1. Availability (Tính sẵn sàng)

Tính sẵn sàng đo lường khả năng hệ thống hoạt động liên tục và có thể truy cập được khi cần.

**Trong dự án:**

- **Railway:** 
  - Cung cấp uptime cao với health checks tự động
  - Tự động restart service nếu crash
  - Zero-downtime deployment với rolling updates
  - Multiple regions support

- **MySQL Master-Slave Replication:**
  - Slave database đóng vai trò backup và read replica
  - Nếu Master gặp sự cố, có thể failover sang Slave
  - Dual write mechanism đảm bảo dữ liệu luôn được sync
  - Railway quản lý automatic backups

- **Vercel:**
  - CDN toàn cầu với edge locations
  - Automatic failover giữa các edge servers
  - 99.99% uptime SLA cho Pro plans

- **Socket Server:**
  - Deploy độc lập trên Railway
  - Tự động restart nếu crash
  - Health checks và monitoring

**Điều này khác biệt hoàn toàn với việc host trên một server vật lý - nếu server đó down, toàn bộ ứng dụng sẽ không thể truy cập được.**

### 4.4.2. Scalability (Khả năng mở rộng)

Scalability là khả năng hệ thống xử lý tải tăng lên bằng cách thêm tài nguyên.

**Trong dự án:**

- **Horizontal Scaling:**
  - Railway cho phép scale số lượng instances cho Backend và Socket Server
  - Vercel tự động scale frontend qua CDN edge locations
  - Load balancing tự động phân phối traffic

- **Vertical Scaling:**
  - Có thể nâng cấp Railway plan để có nhiều RAM, CPU hơn
  - MySQL có thể upgrade từ Starter lên Pro plan với nhiều resources hơn

- **Database Scaling:**
  - MySQL Master-Slave replication cho phép phân tải đọc từ Slave
  - Có thể thêm nhiều Slave databases để tăng khả năng đọc
  - Railway hỗ trợ database scaling dễ dàng

- **Frontend Scaling:**
  - Vercel CDN tự động cache static assets
  - Edge locations giảm latency cho users toàn cầu
  - Automatic scaling không cần cấu hình

**Với on-premise hosting, việc scale thường phức tạp, tốn chi phí mua thêm hardware và setup.**

### 4.4.3. Elasticity (Tự động tăng giảm tài nguyên)

Elasticity là khả năng tự động điều chỉnh tài nguyên theo nhu cầu thực tế.

**Trong dự án:**

- **Auto-scaling:**
  - Railway có thể tự động scale instances dựa trên traffic (với Pro plan)
  - Vercel tự động scale edge servers theo demand
  - MySQL có thể auto-scale storage khi cần

- **Cost Optimization:**
  - Chỉ trả tiền cho tài nguyên thực sự sử dụng
  - Railway Starter plan phù hợp cho development và small production
  - Vercel free tier đủ cho nhiều use cases
  - Có thể scale down khi traffic thấp

- **Resource Management:**
  - Railway tự động quản lý resources
  - Vercel optimize bundle size và caching
  - MySQL automatic backups và maintenance

**Ví dụ:** Một trang web thương mại điện tử có traffic cao vào cuối tuần, thấp vào giữa tuần - elasticity giúp tự động điều chỉnh mà không cần can thiệp thủ công.

### 4.4.4. Fault Tolerance (Khả năng chịu lỗi)

Fault tolerance đảm bảo hệ thống vẫn hoạt động ngay cả khi một số thành phần gặp lỗi.

**Trong dự án:**

- **Railway Health Checks:**
  - Tự động kiểm tra health của service
  - Restart container nếu phát hiện lỗi
  - Zero-downtime deployment với rolling updates
  - Automatic rollback nếu deployment fail

- **MySQL Master-Slave Replication:**
  - Dữ liệu được replicate sang Slave database
  - Nếu Master fail, có thể failover sang Slave
  - Dual write mechanism đảm bảo dữ liệu luôn sync
  - Railway automatic backups và point-in-time recovery

- **Database Redundancy:**
  - 2 MySQL instances (Master + Slave) đảm bảo redundancy
  - Automatic failover capabilities
  - Data consistency được đảm bảo qua dual write

- **Frontend CDN:**
  - Vercel CDN có multiple edge locations
  - Nếu một edge location fail, traffic tự động route sang location khác
  - Automatic failover và health checks

- **Socket Server Resilience:**
  - Deploy độc lập, không ảnh hưởng đến backend nếu crash
  - Automatic restart và health monitoring
  - Connection retry logic ở client-side

**Điều này rất khác với single server - nếu server hoặc ổ cứng hỏng, có thể mất toàn bộ dữ liệu.**

### 4.4.5. Security trên Cloud

Bảo mật là yếu tố then chốt trong điện toán đám mây, đặc biệt khi dữ liệu được lưu trữ trên hạ tầng của bên thứ ba.

**Trong dự án:**

- **HTTPS/TLS:**
  - Railway tự động cấp SSL certificate miễn phí
  - Vercel tự động cấp SSL certificate qua Let's Encrypt
  - Mọi traffic đều được mã hóa end-to-end

- **MySQL Encryption:**
  - **Encryption at rest:** Railway đảm bảo dữ liệu được mã hóa trên disk
  - **Encryption in transit:** Kết nối giữa Laravel và MySQL dùng TLS
  - **Connection strings:** Sử dụng SSL/TLS trong connection strings

- **Authentication & Authorization:**
  - Laravel Sanctum cho API authentication
  - Database users với password mạnh
  - IP whitelisting trên Railway (nếu cần)
  - Role-based access control (RBAC) trong application

- **Environment Variables:**
  - Thông tin nhạy cảm (passwords, API keys) được lưu an toàn trong environment variables
  - Không hard-code trong source code
  - Railway và Vercel đều có secure environment variable management
  - Secrets được encrypt ở rest

- **DDoS Protection:**
  - Railway có DDoS protection ở network level
  - Vercel có built-in DDoS protection và rate limiting
  - Cloudflare integration (nếu sử dụng)

- **Database Security:**
  - Railway MySQL có firewall rules
  - Connection strings chỉ accessible từ authorized services
  - Regular security updates và patches

- **API Security:**
  - CORS configuration
  - CSRF protection (Laravel)
  - Rate limiting
  - Input validation và sanitization

### 4.4.6. Managed Service (Dịch vụ được quản lý tự động)

Managed service là dịch vụ cloud mà nhà cung cấp quản lý toàn bộ infrastructure và maintenance, người dùng chỉ cần tập trung vào code.

**Trong dự án:**

- **Railway quản lý:**
  - Server infrastructure và networking
  - Docker container orchestration
  - OS updates và security patches
  - Load balancing
  - Monitoring và logging
  - Auto-restart khi service crash
  - Database backups và maintenance
  - SSL certificates

- **Vercel quản lý:**
  - CDN infrastructure
  - Edge servers và global distribution
  - Build pipeline và optimization
  - SSL certificates
  - Analytics và monitoring
  - Preview deployments

- **MySQL trên Railway quản lý:**
  - Database infrastructure
  - Backup và disaster recovery tự động
  - Software upgrades (MySQL version)
  - Performance optimization
  - Scaling và replication setup
  - Security patches

**Lợi ích:**

- **Tiết kiệm thời gian:** Không cần setup và maintain servers
- **Giảm rủi ro:** Đội ngũ chuyên gia của provider quản lý bảo mật và uptime
- **Focus vào business logic:** Developer tập trung vào code thay vì quản lý infrastructure
- **Cost-effective:** Không cần thuê DevOps team để quản lý servers
- **Automatic updates:** Security patches và software updates được apply tự động

**Đây là một trong những lợi thế lớn nhất của cloud computing so với traditional hosting, phù hợp với xu hướng DevOps và continuous deployment hiện đại.**

## 4.5. Ưu điểm – Hạn chế của việc triển khai Cloud

### 4.5.1. Ưu điểm

1. **Chi phí tiết kiệm:**
   - Không cần đầu tư phần cứng ban đầu
   - Chỉ trả tiền theo tài nguyên sử dụng (pay-as-you-go)
   - Railway Starter plan và Vercel free tier cho phép phát triển và chạy dự án nhỏ miễn phí
   - Có thể scale down khi không cần thiết

2. **Dễ dàng mở rộng:**
   - Scale up/down chỉ với vài click hoặc tự động theo traffic
   - Có thể mở rộng ra nhiều regions mà không bị giới hạn bởi phần cứng vật lý
   - Horizontal và vertical scaling đều dễ dàng
   - Database scaling với Master-Slave replication

3. **Tốc độ triển khai nhanh:**
   - Deploy ứng dụng trong vài phút với CI/CD tự động
   - Không cần setup server từ đầu như traditional hosting
   - Railway và Vercel đều có one-click deployment từ GitHub
   - Automatic builds và deployments

4. **Độ tin cậy cao:**
   - Uptime 99.9%+ với health checks tự động
   - Automatic backup, disaster recovery
   - Redundancy ở nhiều levels (server, datacenter, region)
   - Master-Slave database replication đảm bảo data redundancy

5. **Bảo mật tốt:**
   - Được quản lý bởi đội ngũ chuyên gia với compliance chuẩn quốc tế
   - SSL/TLS tự động
   - Regular security updates
   - DDoS protection
   - Encrypted data at rest và in transit

6. **Managed Services:**
   - Không cần quản lý infrastructure
   - Automatic updates và patches
   - Monitoring và logging tự động
   - Focus vào development thay vì operations

7. **Global CDN:**
   - Vercel CDN với edge locations toàn cầu
   - Giảm latency cho users ở mọi nơi
   - Automatic caching và optimization

### 4.5.2. Hạn chế

1. **Phụ thuộc nhà cung cấp (Vendor Lock-in):**
   - Khó migrate sang platform khác khi đã đầu tư sâu
   - Mỗi provider có APIs và workflows khác nhau
   - Railway và Vercel có các tính năng riêng biệt
   - Cần thời gian để học và adapt với mỗi platform

2. **Giới hạn Free Tier:**
   - Railway Starter plan có giới hạn về resources
   - Vercel free tier có giới hạn về bandwidth và build time
   - MySQL free tier giới hạn storage và connections
   - Không phù hợp cho production apps có traffic cao

3. **Phụ thuộc Internet:**
   - Cần kết nối ổn định để truy cập và quản lý
   - Latency phụ thuộc chất lượng mạng
   - Không thể truy cập khi mất internet
   - Phụ thuộc vào uptime của cloud provider

4. **Chi phí tăng theo quy mô:**
   - Khi scale lên, chi phí có thể tăng nhanh
   - Khó dự đoán chính xác chi phí khi traffic tăng đột biến
   - Database scaling có thể tốn kém
   - Cần monitor và optimize costs thường xuyên

5. **Ít kiểm soát:**
   - Không có full access vào infrastructure
   - Phụ thuộc maintenance schedule của provider
   - Không thể customize OS hoặc low-level configurations
   - Phụ thuộc vào roadmap và updates của provider

6. **Complexity:**
   - Quản lý nhiều services (Backend, Socket, Database, Frontend)
   - Cần hiểu về Docker, environment variables, networking
   - Debugging có thể phức tạp hơn với distributed systems
   - Cần monitor nhiều components

7. **Data Location:**
   - Dữ liệu có thể được lưu ở data centers nước ngoài
   - Có thể có vấn đề về compliance và data sovereignty
   - Latency có thể cao hơn nếu data center xa users

8. **Learning Curve:**
   - Cần học cách sử dụng Railway và Vercel
   - Cần hiểu về Docker, CI/CD, environment variables
   - Cần kiến thức về cloud architecture và best practices

