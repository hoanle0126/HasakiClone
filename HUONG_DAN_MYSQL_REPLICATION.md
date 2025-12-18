# Hướng Dẫn Thiết Lập MySQL Master-Slave Replication

## Tổng Quan

MySQL Replication cho phép sao chép dữ liệu từ một MySQL server (Master) sang một hoặc nhiều MySQL server khác (Slave). Điều này giúp:
- **High Availability**: Nếu Master bị lỗi, có thể chuyển sang Slave
- **Load Balancing**: Phân tán đọc (read) sang Slave, Master chỉ xử lý ghi (write)
- **Backup**: Slave có thể dùng như backup tự động
- **Disaster Recovery**: Dữ liệu được sao chép ở nhiều nơi

---

## Yêu Cầu

- 2 VPS với MySQL đã cài đặt (MySQL 5.7+ hoặc MySQL 8.0+)
- Cả 2 VPS có thể kết nối với nhau qua network
- Quyền root hoặc sudo trên cả 2 VPS
- Port 3306 đã mở trong firewall (hoặc port MySQL bạn đang dùng)

---

## Kiến Trúc

```
┌─────────────────┐         ┌─────────────────┐
│   VPS 1 (Master)│────────▶│   VPS 2 (Slave) │
│   IP: 10.0.0.1  │  Replication │   IP: 10.0.0.2  │
│   MySQL: 3306   │         │   MySQL: 3306   │
└─────────────────┘         └─────────────────┘
```

---

## Bước 1: Cấu Hình Master Server (VPS 1)

### 1.1. Chỉnh Sửa File Cấu Hình MySQL

```bash
# Backup file cấu hình hiện tại
sudo cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf.backup

# Chỉnh sửa file cấu hình
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Thêm hoặc chỉnh sửa các dòng sau trong section `[mysqld]`:

```ini
[mysqld]
# Server ID - phải unique cho mỗi server
server-id = 1

# Binary logging - bắt buộc cho replication
log-bin = /var/log/mysql/mysql-bin.log
binlog-format = ROW

# Chỉ định database nào sẽ replicate (tùy chọn)
# Nếu không có, tất cả database sẽ được replicate
# binlog-do-db = your_database_name

# Bỏ qua các database không cần replicate (tùy chọn)
binlog-ignore-db = mysql
binlog-ignore-db = information_schema
binlog-ignore-db = performance_schema
binlog-ignore-db = sys

# Tối ưu hóa
expire_logs_days = 7
max_binlog_size = 100M

# Bind address - cho phép kết nối từ xa
bind-address = 0.0.0.0
```

**Lưu ý**: 
- `server-id = 1` cho Master (phải unique)
- `bind-address = 0.0.0.0` để cho phép Slave kết nối từ xa

### 1.2. Tạo User Replication trên Master

```bash
# Đăng nhập vào MySQL
sudo mysql -u root -p
```

Trong MySQL console:

```sql
-- Tạo user cho replication
CREATE USER 'replicator'@'%' IDENTIFIED BY 'your_strong_password_here';

-- Cấp quyền replication
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';

-- Hoặc nếu muốn giới hạn chỉ từ IP của Slave:
-- CREATE USER 'replicator'@'10.0.0.2' IDENTIFIED BY 'your_strong_password_here';
-- GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'10.0.0.2';

-- Flush privileges
FLUSH PRIVILEGES;

-- Kiểm tra trạng thái Master
SHOW MASTER STATUS;
```

**Lưu ý**: Ghi lại 2 giá trị quan trọng từ `SHOW MASTER STATUS`:
- `File`: Tên file binary log (ví dụ: `mysql-bin.000001`)
- `Position`: Vị trí trong file (ví dụ: `154`)

Ví dụ output:
```
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000001 |      154 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
```

### 1.3. Restart MySQL Service

```bash
sudo systemctl restart mysql
sudo systemctl status mysql
```

### 1.4. Cấu Hình Firewall

```bash
# Cho phép kết nối từ Slave
sudo ufw allow from 10.0.0.2 to any port 3306

# Hoặc cho phép từ tất cả (ít bảo mật hơn)
# sudo ufw allow 3306/tcp
```

---

## Bước 2: Cấu Hình Slave Server (VPS 2)

### 2.1. Chỉnh Sửa File Cấu Hình MySQL

```bash
# Backup file cấu hình
sudo cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf.backup

# Chỉnh sửa file cấu hình
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Thêm hoặc chỉnh sửa trong section `[mysqld]`:

```ini
[mysqld]
# Server ID - phải khác với Master
server-id = 2

# Relay log - file log trung gian
relay-log = /var/log/mysql/mysql-relay-bin.log

# Log các query từ Master
log-slave-updates = 1

# Read-only mode (khuyến nghị cho Slave)
read-only = 1

# Bỏ qua các database không cần replicate
replicate-ignore-db = mysql
replicate-ignore-db = information_schema
replicate-ignore-db = performance_schema
replicate-ignore-db = sys

# Chỉ replicate database cụ thể (nếu cần)
# replicate-do-db = your_database_name

# Bind address
bind-address = 0.0.0.0
```

**Lưu ý**: 
- `server-id = 2` cho Slave (phải khác với Master)
- `read-only = 1` để tránh ghi dữ liệu trực tiếp vào Slave

### 2.2. Restart MySQL Service

```bash
sudo systemctl restart mysql
sudo systemctl status mysql
```

### 2.3. Cấu Hình Replication

```bash
# Đăng nhập vào MySQL
sudo mysql -u root -p
```

Trong MySQL console:

```sql
-- Dừng Slave (nếu đang chạy)
STOP SLAVE;

-- Cấu hình kết nối đến Master
-- Thay đổi các giá trị sau:
-- - MASTER_HOST: IP của Master
-- - MASTER_USER: User replication đã tạo trên Master
-- - MASTER_PASSWORD: Password của user replication
-- - MASTER_LOG_FILE: File từ SHOW MASTER STATUS trên Master
-- - MASTER_LOG_POS: Position từ SHOW MASTER STATUS trên Master

CHANGE MASTER TO
  MASTER_HOST='10.0.0.1',
  MASTER_USER='replicator',
  MASTER_PASSWORD='your_strong_password_here',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=154;

-- Bắt đầu replication
START SLAVE;

-- Kiểm tra trạng thái Slave
SHOW SLAVE STATUS\G
```

### 2.4. Kiểm Tra Trạng Thái Replication

Trong output của `SHOW SLAVE STATUS\G`, kiểm tra:

```sql
SHOW SLAVE STATUS\G
```

Các trường quan trọng:
- `Slave_IO_Running`: Phải là `Yes`
- `Slave_SQL_Running`: Phải là `Yes`
- `Seconds_Behind_Master`: Số giây lag (0 = đồng bộ hoàn toàn)
- `Last_IO_Error`: Lỗi kết nối (nếu có)
- `Last_SQL_Error`: Lỗi SQL (nếu có)

**Nếu có lỗi**, kiểm tra:
```sql
-- Xem lỗi chi tiết
SHOW SLAVE STATUS\G

-- Nếu cần reset
STOP SLAVE;
RESET SLAVE;
-- Sau đó cấu hình lại CHANGE MASTER TO và START SLAVE
```

---

## Bước 3: Kiểm Tra Replication

### 3.1. Test trên Master

```bash
# Trên Master (VPS 1)
sudo mysql -u root -p
```

```sql
-- Tạo database test
CREATE DATABASE test_replication;

-- Tạo bảng
USE test_replication;
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu
INSERT INTO test_table (name) VALUES ('Test 1'), ('Test 2'), ('Test 3');

-- Kiểm tra
SELECT * FROM test_table;
```

### 3.2. Kiểm Tra trên Slave

```bash
# Trên Slave (VPS 2)
sudo mysql -u root -p
```

```sql
-- Kiểm tra database đã được replicate chưa
SHOW DATABASES;

-- Sử dụng database
USE test_replication;

-- Kiểm tra dữ liệu
SELECT * FROM test_table;

-- Nếu thấy dữ liệu giống Master → Replication thành công! ✅
```

### 3.3. Kiểm Tra Realtime

**Trên Master:**
```sql
-- Thêm dữ liệu mới
INSERT INTO test_replication.test_table (name) VALUES ('New Data');
```

**Trên Slave (ngay lập tức):**
```sql
-- Kiểm tra dữ liệu mới
SELECT * FROM test_replication.test_table;
-- Dữ liệu mới sẽ xuất hiện trong vài giây
```

---

## Bước 4: Tối Ưu Hóa và Bảo Mật

### 4.1. Tối Ưu Hóa Master

```ini
# Thêm vào /etc/mysql/mysql.conf.d/mysqld.cnf trên Master
[mysqld]
# Tối ưu binary log
sync_binlog = 1
innodb_flush_log_at_trx_commit = 1

# Tối ưu hiệu suất
innodb_buffer_pool_size = 1G  # Điều chỉnh theo RAM
max_connections = 200
```

### 4.2. Tối Ưu Hóa Slave

```ini
# Thêm vào /etc/mysql/mysql.conf.d/mysqld.cnf trên Slave
[mysqld]
# Tối ưu relay log
relay_log_recovery = 1

# Tối ưu hiệu suất
innodb_buffer_pool_size = 1G
max_connections = 200
```

### 4.3. Bảo Mật

```bash
# Chỉ cho phép kết nối từ IP cụ thể
# Trên Master, thay đổi user replication:
```

```sql
-- Xóa user cũ
DROP USER 'replicator'@'%';

-- Tạo user chỉ từ IP Slave
CREATE USER 'replicator'@'10.0.0.2' IDENTIFIED BY 'strong_password';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'10.0.0.2';
FLUSH PRIVILEGES;
```

### 4.4. SSL/TLS (Khuyến nghị cho Production)

```sql
-- Trên Master, tạo user với SSL requirement
CREATE USER 'replicator'@'10.0.0.2' IDENTIFIED BY 'password' REQUIRE SSL;
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'10.0.0.2';
FLUSH PRIVILEGES;
```

```sql
-- Trên Slave, cấu hình với SSL
CHANGE MASTER TO
  MASTER_HOST='10.0.0.1',
  MASTER_USER='replicator',
  MASTER_PASSWORD='password',
  MASTER_SSL=1,
  MASTER_SSL_CA='/path/to/ca.pem',
  MASTER_SSL_CERT='/path/to/client-cert.pem',
  MASTER_SSL_KEY='/path/to/client-key.pem',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=154;
```

---

## Bước 5: Monitoring và Maintenance

### 5.1. Script Kiểm Tra Replication

Tạo file `check_replication.sh`:

```bash
#!/bin/bash

# Kiểm tra trạng thái replication
mysql -u root -p'your_password' -e "SHOW SLAVE STATUS\G" | grep -E "Slave_IO_Running|Slave_SQL_Running|Seconds_Behind_Master|Last_IO_Error|Last_SQL_Error"

# Nếu có lỗi, gửi cảnh báo
if [ $? -ne 0 ]; then
    echo "Replication có vấn đề!"
    # Có thể gửi email hoặc notification
fi
```

```bash
# Cấp quyền thực thi
chmod +x check_replication.sh

# Chạy định kỳ với cron
crontab -e
# Thêm dòng:
# */5 * * * * /path/to/check_replication.sh
```

### 5.2. Backup Binary Logs

```bash
# Trên Master, xóa binary logs cũ (sau khi đã replicate)
# Trong MySQL:
PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 7 DAY);
```

### 5.3. Xử Lý Lỗi Thường Gặp

#### Lỗi: "Last_IO_Error: error connecting to master"

```bash
# Kiểm tra:
# 1. Firewall đã mở port 3306 chưa
# 2. MySQL đang listen trên 0.0.0.0 chưa
# 3. User replication có quyền chưa
# 4. Password đúng chưa

# Test kết nối từ Slave đến Master
mysql -h 10.0.0.1 -u replicator -p
```

#### Lỗi: "Last_SQL_Error: Error 'Duplicate entry'"

```sql
-- Nếu có duplicate key, có thể skip lỗi này
STOP SLAVE;
SET GLOBAL sql_slave_skip_counter = 1;
START SLAVE;

-- Hoặc skip lỗi tự động (cẩn thận!)
-- Thêm vào my.cnf:
-- slave-skip-errors = 1062
```

#### Lỗi: "Slave lagging behind"

```sql
-- Kiểm tra lag
SHOW SLAVE STATUS\G

-- Nếu lag lớn, có thể do:
# 1. Network chậm
# 2. Slave server yếu
# 3. Quá nhiều query trên Master

-- Tối ưu Slave:
# - Tăng innodb_buffer_pool_size
# - Tăng max_connections
# - Kiểm tra network bandwidth
```

---

## Bước 6: Failover (Chuyển Slave thành Master)

### 6.1. Khi Master Bị Lỗi

```sql
-- Trên Slave, dừng replication
STOP SLAVE;

-- Reset slave để có thể trở thành master
RESET SLAVE ALL;

-- Bật write (nếu đang read-only)
SET GLOBAL read_only = 0;

-- Cập nhật application để trỏ đến Slave
```

### 6.2. Promote Slave thành Master

```bash
# Chỉnh sửa my.cnf trên Slave (giờ là Master mới)
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
[mysqld]
server-id = 1  # Đổi thành 1
log-bin = /var/log/mysql/mysql-bin.log
read-only = 0  # Bỏ hoặc set = 0
```

```bash
sudo systemctl restart mysql
```

```sql
-- Tạo user replication mới
CREATE USER 'replicator'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';
FLUSH PRIVILEGES;

-- Lấy thông tin master status
SHOW MASTER STATUS;
```

---

## Bước 7: Multi-Slave (Nhiều Slave)

Nếu muốn có nhiều Slave:

```sql
-- Trên Master, tạo user cho Slave 2
CREATE USER 'replicator2'@'10.0.0.3' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'replicator2'@'10.0.0.3';
FLUSH PRIVILEGES;

-- Trên Slave 2, cấu hình tương tự Slave 1
-- Chỉ cần đổi server-id = 3
```

---

## Tổng Kết

Sau khi hoàn thành, bạn sẽ có:
- ✅ Master-Slave replication hoạt động
- ✅ Dữ liệu tự động đồng bộ từ Master sang Slave
- ✅ High availability và backup tự động
- ✅ Khả năng failover khi Master bị lỗi

## Lưu Ý Quan Trọng

1. **Backup thường xuyên**: Replication không thay thế backup
2. **Monitor replication**: Kiểm tra trạng thái định kỳ
3. **Test failover**: Thực hành chuyển đổi Master-Slave
4. **Bảo mật**: Sử dụng SSL và firewall
5. **Documentation**: Ghi lại cấu hình và thủ tục

## Tài Liệu Tham Khảo

- [MySQL Replication Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL Binary Logging](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)
- [MySQL High Availability](https://dev.mysql.com/doc/refman/8.0/en/ha-overview.html)

