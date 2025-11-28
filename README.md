# HasakiClone Project

Đây là dự án mã nguồn mở mô phỏng website thương mại điện tử Hasaki (Hasaki Clone). Dự án được xây dựng với kiến trúc **Monorepo** tách biệt giữa Frontend và Backend.

## 🛠 Công nghệ sử dụng

### 🔙 Backend (API)
* **Framework:** Laravel 10.x / 11.x
* **Ngôn ngữ:** PHP >= 8.1
* **Database:** MySQL
* **Authentication:** Laravel Sanctum (hoặc JWT)

### 🎨 Frontend (Client)
* **Framework:** ReactJS
* **Build Tool:** Vite
* **State Management:** Redux Toolkit / Context API
* **Styling:** CSS Modules / TailwindCSS
* **HTTP Client:** Axios

---

## ⚙️ Yêu cầu môi trường (Prerequisites)

Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã có:
1.  **Node.js** (v16 trở lên) & **npm** (hoặc yarn).
2.  **PHP** (đã cài đặt extension cần thiết cho Laravel).
3.  **Composer**.
4.  **MySQL Server**.

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Cấu hình Backend (Laravel)

Mở terminal tại thư mục gốc và chạy các lệnh sau:

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các gói phụ thuộc PHP
composer install

# 3. Tạo file môi trường từ file mẫu
cp .env.example .env

# 4. Tạo Application Key
php artisan key:generate