# Hướng Dẫn Cấu Hình Dual Database trong Laravel

## Tổng Quan

Laravel đã được cấu hình để tự động ghi dữ liệu vào cả 2 MySQL databases (Master và Slave) khi có thay đổi. 

---

## Cấu Hình

### 1. Thêm vào file `.env`

```env
# Dual Database Configuration
DB_DUAL_WRITE_ENABLED=true

# Master Database (MySQL instance 1 - Port 3306)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=your_password

# Slave Database (MySQL instance 2 - Port 3307)
DB_SLAVE_HOST=127.0.0.1
DB_SLAVE_PORT=3307
DB_SLAVE_DATABASE=your_database
DB_SLAVE_USERNAME=root
DB_SLAVE_PASSWORD=your_password
```

### 2. Các Model đã được cấu hình

- **Order** - Đã thêm trait `SyncsToSlaveDatabase`

### 3. Thêm trait vào các Model khác (nếu cần)

Nếu muốn các Model khác cũng sync, thêm trait vào:

```php
<?php

namespace App\Models;

use App\Traits\SyncsToSlaveDatabase;
use Illuminate\Database\Eloquent\Model;

class YourModel extends Model
{
    use SyncsToSlaveDatabase;
    
    // ... rest of your model
}
```

**Các Model nên thêm trait:**
- Order ✅ (đã thêm)
- User
- Product
- Cart
- Address
- Review
- ... và các model khác cần sync

---

## Cách Hoạt Động

### 1. Eloquent Models với Trait

Khi bạn sử dụng Eloquent để tạo, cập nhật, hoặc xóa:

```php
// Tạo mới - tự động sync cả 2 databases
$order = Order::create([
    'user_id' => 1,
    'note' => 'Test order',
]);

// Cập nhật - tự động sync cả 2 databases
$order->update(['note' => 'Updated note']);

// Xóa - tự động sync cả 2 databases
$order->delete();
```

### 2. Query Builder

Nếu dùng Query Builder trực tiếp, cần sync thủ công:

```php
use App\Services\DualDatabaseService;

// Insert
DualDatabaseService::insert('table_name', [
    'column1' => 'value1',
    'column2' => 'value2',
]);

// Update
DualDatabaseService::update('table_name', 
    ['column1' => 'new_value'],
    ['id' => 1]
);

// Delete
DualDatabaseService::delete('table_name', ['id' => 1]);
```

### 3. Pivot Tables

Pivot tables cần sync thủ công. Ví dụ trong OrderController:

```php
// Sync pivot table manually
foreach ($products as $value) {
    $order->Products()->attach($value['id'], [
        'quantity' => $value['quantity_cart']
    ]);
    
    // Sync to slave
    if (env('DB_DUAL_WRITE_ENABLED', false)) {
        \DB::connection('mysql-slave')->table('order_product')->insert([
            'order_id' => $order->id,
            'product_id' => $value['id'],
            'quantity' => $value['quantity_cart'],
        ]);
    }
}
```

---

## Kiểm Tra

### 1. Test tạo dữ liệu mới

```php
// Trên Master (port 3306)
mysql -u root -p -P 3306
USE your_database;
SELECT COUNT(*) FROM orders;

// Trên Slave (port 3307)
mysql -u root -p -P 3307
USE your_database;
SELECT COUNT(*) FROM orders;

// Nếu số lượng giống nhau → Sync thành công! ✅
```

### 2. Kiểm tra log

```bash
# Xem log Laravel
tail -f storage/logs/laravel.log | grep "slave"

# Nếu có lỗi sync, sẽ thấy log:
# "Failed to sync to slave database: ..."
```

---

## Xử Lý Lỗi

### Nếu Slave database bị lỗi

- **Master vẫn hoạt động bình thường** - Không ảnh hưởng đến ứng dụng
- **Lỗi được log** - Kiểm tra `storage/logs/laravel.log`
- **Có thể retry** - Sync lại sau khi Slave hoạt động

### Sync lại dữ liệu nếu Slave bị thiếu

```php
// Script để sync lại tất cả dữ liệu từ Master sang Slave
use Illuminate\Support\Facades\DB;
use App\Models\Order;

// Lấy tất cả orders từ Master
$orders = DB::connection('mysql')->table('orders')->get();

// Insert vào Slave
foreach ($orders as $order) {
    DB::connection('mysql-slave')->table('orders')->insert((array) $order);
}
```

---

## Tắt/Bật Dual Write

```env
# Tắt dual write (chỉ dùng Master)
DB_DUAL_WRITE_ENABLED=false

# Bật dual write (ghi vào cả 2 databases)
DB_DUAL_WRITE_ENABLED=true
```

---

## Lưu Ý Quan Trọng

1. **Performance**: Dual write sẽ chậm hơn một chút vì phải ghi 2 lần
2. **Transaction**: Nếu Master fail, Slave cũng sẽ rollback (trong cùng transaction)
3. **Pivot Tables**: Cần sync thủ công cho pivot tables
4. **Migrations**: Chỉ chạy migrations trên Master, sau đó sync schema sang Slave
5. **Read Operations**: Mặc định vẫn đọc từ Master, có thể config để đọc từ Slave nếu cần

---

## Cấu Hình Đọc từ Slave (Optional)

Nếu muốn đọc từ Slave để giảm tải Master:

```php
// Trong Model hoặc Controller
$orders = Order::on('mysql-slave')->get();

// Hoặc trong config để mặc định đọc từ Slave
'default' => env('DB_READ_CONNECTION', 'mysql-slave'),
```

---

## Tổng Kết

✅ **Đã cấu hình:**
- Connection `mysql-slave` trong `config/database.php`
- Trait `SyncsToSlaveDatabase` cho tự động sync
- Service `DualDatabaseService` cho manual sync
- Order model đã được thêm trait
- OrderController đã sync pivot table

📝 **Cần làm:**
1. Thêm biến môi trường vào `.env`
2. Thêm trait vào các Model khác nếu cần
3. Test sync để đảm bảo hoạt động đúng

