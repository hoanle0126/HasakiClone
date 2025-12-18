# Hướng Dẫn Reset Mật Khẩu MySQL

## Lỗi: "Can't connect to local MySQL server through socket"

Lỗi này thường xảy ra khi:
1. MySQL service không đang chạy
2. Socket file không tồn tại
3. Mật khẩu bị quên hoặc sai

---

## Bước 1: Kiểm Tra MySQL Service

```bash
# Kiểm tra MySQL service có đang chạy không
sudo systemctl status mysql

# Hoặc với MariaDB
sudo systemctl status mariadb

# Nếu service không chạy, khởi động
sudo systemctl start mysql
# hoặc
sudo systemctl start mariadb

# Kiểm tra lại
sudo systemctl status mysql
```

---

## Bước 2: Kiểm Tra Socket File

```bash
# Kiểm tra socket file có tồn tại không
ls -la /var/run/mysqld/mysqld.sock

# Nếu không tồn tại, kiểm tra đường dẫn khác
find /var -name "*.sock" 2>/dev/null | grep mysql

# Kiểm tra process MySQL
ps aux | grep mysql
```

---

## Bước 3: Reset Mật Khẩu MySQL (Cách 1: Safe Mode)

### 3.1. Dừng MySQL Service

```bash
# Dừng MySQL
sudo systemctl stop mysql
# hoặc
sudo systemctl stop mariadb

# Kiểm tra đã dừng
sudo systemctl status mysql
```

### 3.2. Khởi Động MySQL ở Safe Mode (Skip Grant Tables)

```bash
# Khởi động MySQL mà không cần password (skip grant tables)
sudo mysqld_safe --skip-grant-tables --skip-networking &

# Hoặc với MySQL 8.0+
sudo mysqld --skip-grant-tables --skip-networking &

# Chờ vài giây để MySQL khởi động
sleep 5

# Kiểm tra MySQL đã chạy
ps aux | grep mysql
```

**Lưu ý**: Ở chế độ này, MySQL chấp nhận kết nối mà không cần password.

### 3.3. Kết Nối và Reset Password

Mở terminal **MỚI** (giữ terminal cũ đang chạy mysqld_safe):

```bash
# Kết nối MySQL không cần password
sudo mysql -u root

# Hoặc nếu không được, thử:
sudo mysql -u root mysql
```

Trong MySQL console:

#### **Cho MySQL 5.7 trở xuống:**

```sql
-- Sử dụng database mysql
USE mysql;

-- Reset password cho user root
UPDATE user SET password=PASSWORD('your_new_password_here') WHERE User='root';

-- Hoặc nếu không có hàm PASSWORD:
UPDATE user SET authentication_string=PASSWORD('your_new_password_here') WHERE User='root';

-- Flush privileges
FLUSH PRIVILEGES;

-- Thoát
EXIT;
```

#### **Cho MySQL 8.0+:**

```sql
-- Sử dụng database mysql
USE mysql;

-- Reset password cho user root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password_here';

-- Flush privileges
FLUSH PRIVILEGES;

-- Thoát
EXIT;
```

### 3.4. Dừng MySQL Safe Mode và Khởi Động Lại

```bash
# Dừng MySQL safe mode
sudo pkill mysqld
sudo pkill mysqld_safe

# Hoặc dừng tất cả process MySQL
sudo killall mysqld
sudo killall mysqld_safe

# Chờ vài giây
sleep 3

# Khởi động MySQL bình thường
sudo systemctl start mysql

# Kiểm tra status
sudo systemctl status mysql
```

### 3.5. Test Kết Nối với Mật Khẩu Mới

```bash
# Kết nối với password mới
sudo mysql -u root -p
# Nhập password mới khi được hỏi
```

---

## Bước 4: Reset Mật Khẩu MySQL (Cách 2: Với systemd)

Nếu cách trên không hoạt động, thử cách này:

### 4.1. Tạo File Reset SQL

```bash
# Tạo file SQL để reset password
sudo nano /tmp/reset_password.sql
```

Nội dung file:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password_here';
FLUSH PRIVILEGES;
```

### 4.2. Khởi Động MySQL với Init File

```bash
# Dừng MySQL
sudo systemctl stop mysql

# Khởi động với init file (MySQL 8.0+)
sudo mysqld --init-file=/tmp/reset_password.sql &

# Hoặc với MySQL 5.7
sudo mysqld_safe --init-file=/tmp/reset_password.sql &

# Chờ vài giây
sleep 5

# Dừng MySQL và khởi động lại bình thường
sudo pkill mysqld
sudo systemctl start mysql
```

### 4.3. Xóa File SQL (Bảo mật)

```bash
# Xóa file chứa password
sudo rm /tmp/reset_password.sql
```

---

## Bước 5: Reset Mật Khẩu MySQL (Cách 3: Với MySQL Service File)

### 5.1. Tạo Service Override

```bash
# Tạo thư mục override
sudo mkdir -p /etc/systemd/system/mysql.service.d/

# Tạo file override
sudo nano /etc/systemd/system/mysql.service.d/override.conf
```

Nội dung:

```ini
[Service]
ExecStart=
ExecStart=/usr/sbin/mysqld --skip-grant-tables --skip-networking
```

### 5.2. Khởi Động MySQL

```bash
# Reload systemd
sudo systemctl daemon-reload

# Khởi động MySQL
sudo systemctl start mysql

# Kết nối và reset password
sudo mysql -u root
```

Sau đó reset password như Bước 3.3, sau đó:

```bash
# Xóa file override
sudo rm /etc/systemd/system/mysql.service.d/override.conf

# Reload systemd
sudo systemctl daemon-reload

# Restart MySQL bình thường
sudo systemctl restart mysql
```

---

## Bước 6: Xử Lý Các Lỗi Thường Gặp

### 6.1. Lỗi: "Access denied for user 'root'@'localhost'"

```bash
# Thử kết nối với sudo
sudo mysql -u root

# Hoặc nếu vẫn lỗi, kiểm tra user tồn tại chưa
sudo mysql
```

```sql
SELECT user, host FROM mysql.user WHERE user='root';
```

### 6.2. Lỗi: "mysqld_safe: command not found"

```bash
# Tìm đường dẫn mysqld_safe
which mysqld_safe
# hoặc
find /usr -name mysqld_safe

# Nếu không tìm thấy, dùng mysqld trực tiếp
sudo mysqld --skip-grant-tables --skip-networking &
```

### 6.3. Lỗi: "PID file found"

```bash
# Xóa PID file cũ
sudo rm /var/run/mysqld/mysqld.pid

# Hoặc
sudo rm /var/lib/mysql/mysqld.pid

# Sau đó khởi động lại
sudo systemctl start mysql
```

### 6.4. Lỗi: "Port already in use"

```bash
# Tìm process đang dùng port 3306
sudo lsof -i :3306

# Hoặc
sudo netstat -tulpn | grep 3306

# Kill process
sudo kill -9 <PID>

# Hoặc kill tất cả MySQL process
sudo killall mysqld
sudo killall mysqld_safe
```

---

## Bước 7: Cấu Hình MySQL Sau Khi Reset

### 7.1. Đảm Bảo MySQL Chạy Đúng

```bash
# Kiểm tra status
sudo systemctl status mysql

# Kiểm tra có thể kết nối
sudo mysql -u root -p
```

### 7.2. Bảo Mật MySQL (Tùy chọn)

```bash
# Chạy script bảo mật
sudo mysql_secure_installation
```

Script này sẽ hỏi:
- Có đổi password root không (nếu muốn)
- Xóa anonymous user
- Disable remote login cho root
- Xóa test database
- Reload privilege tables

### 7.3. Tạo User Mới (Khuyến nghị)

```sql
-- Tạo user mới với quyền đầy đủ
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Hoặc cho phép remote access
CREATE USER 'admin'@'%' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

---

## Bước 8: Kiểm Tra và Test

```bash
# Test kết nối local
sudo mysql -u root -p

# Test với user mới
mysql -u admin -p

# Kiểm tra các database
mysql -u root -p -e "SHOW DATABASES;"

# Kiểm tra users
mysql -u root -p -e "SELECT user, host FROM mysql.user;"
```

---

## Tổng Kết

### Quy Trình Reset Password (Tóm Tắt):

1. **Dừng MySQL**: `sudo systemctl stop mysql`
2. **Khởi động safe mode**: `sudo mysqld_safe --skip-grant-tables --skip-networking &`
3. **Kết nối**: `sudo mysql -u root`
4. **Reset password**: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`
5. **Flush privileges**: `FLUSH PRIVILEGES;`
6. **Dừng safe mode**: `sudo killall mysqld`
7. **Khởi động lại**: `sudo systemctl start mysql`
8. **Test**: `sudo mysql -u root -p`

---

## Lưu Ý Bảo Mật

1. **Sau khi reset password, đổi ngay sang password mạnh**
2. **Không để MySQL chạy ở safe mode trên production**
3. **Xóa các file tạm chứa password**
4. **Sử dụng user riêng thay vì root cho ứng dụng**
5. **Bật firewall và chỉ cho phép kết nối từ IP cần thiết**

---

## Troubleshooting Nhanh

```bash
# Nếu vẫn không kết nối được:

# 1. Kiểm tra MySQL đang chạy
sudo systemctl status mysql

# 2. Kiểm tra port
sudo netstat -tulpn | grep 3306

# 3. Kiểm tra log
sudo tail -f /var/log/mysql/error.log

# 4. Kiểm tra socket
ls -la /var/run/mysqld/mysqld.sock

# 5. Kiểm tra quyền thư mục
ls -la /var/lib/mysql/

# 6. Restart hoàn toàn
sudo systemctl stop mysql
sudo killall mysqld
sudo systemctl start mysql
```

---

## Tham Khảo

- [MySQL Reset Password Official Docs](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)
- [MySQL Troubleshooting](https://dev.mysql.com/doc/refman/8.0/en/error-handling.html)

