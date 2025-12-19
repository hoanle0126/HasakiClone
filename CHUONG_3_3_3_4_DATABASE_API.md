# 3.3. Thiết kế cơ sở dữ liệu

## 3.3.1. Các bảng chính

### 3.3.1.1. Users

**Bảng 1. Bảng: users**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| first_name | VARCHAR(255) | Tên người dùng |
| last_name | VARCHAR(255) | Họ người dùng |
| email | VARCHAR(255) | Email (duy nhất) |
| password | VARCHAR(255) | Mật khẩu đã mã hóa (bcrypt) |
| birth | DATE | Ngày sinh |
| gender | VARCHAR(255) | Giới tính |
| email_verified_at | TIMESTAMP | Thời gian xác thực email |
| remember_token | VARCHAR(100) | Token ghi nhớ đăng nhập |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Quan hệ:**
- `hasOne(Cart)` - Một user có một giỏ hàng
- `hasMany(Address)` - Một user có nhiều địa chỉ
- `hasMany(Order)` - Một user có nhiều đơn hàng

### 3.3.1.2. Products

**Bảng 2. Bảng: products**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| name | VARCHAR(255) | Tên sản phẩm mỹ phẩm (duy nhất) |
| english_name | VARCHAR(255) | Tên tiếng Anh |
| url | VARCHAR(255) | URL slug (tự động tạo từ name) |
| description | LONGTEXT | Mô tả sản phẩm |
| quantity | INTEGER | Số lượng tồn kho ban đầu |
| remain | INTEGER | Số lượng còn lại |
| search_count | INTEGER | Số lần tìm kiếm |
| price | FLOAT | Giá tiền |
| sales | FLOAT | Giá khuyến mãi |
| images | JSON | Mảng URL hình ảnh |
| parameters | JSON | Thông số kỹ thuật (mảng objects) |
| ingredients | LONGTEXT | Thành phần |
| guide | LONGTEXT | Hướng dẫn sử dụng |
| thumbnail | LONGTEXT | URL hình ảnh đại diện |
| categories_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng categories |
| brand_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng brands |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Quan hệ:**
- `belongsTo(Categories)` - Sản phẩm thuộc một danh mục
- `belongsTo(Brand)` - Sản phẩm thuộc một thương hiệu
- `belongsToMany(Cart)` - Nhiều sản phẩm trong nhiều giỏ hàng (pivot: quantity)
- `belongsToMany(Order)` - Nhiều sản phẩm trong nhiều đơn hàng (pivot: quantity)
- `hasMany(Review)` - Một sản phẩm có nhiều đánh giá
- `belongsToMany(HotDealDate)` - Sản phẩm có thể thuộc nhiều hot deals (pivot: sales)
- `belongsToMany(FlashDeal)` - Sản phẩm có thể thuộc nhiều flash deals

### 3.3.1.3. Carts

**Bảng 3. Bảng: carts**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| user_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng users |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Bảng 3a. Bảng pivot: cart_product**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| cart_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng carts |
| product_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng products |
| quantity | INTEGER | Số lượng sản phẩm trong giỏ |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Quan hệ:**
- `belongsTo(User)` - Giỏ hàng thuộc một user
- `belongsToMany(Product)` - Giỏ hàng chứa nhiều sản phẩm (pivot: quantity)

### 3.3.1.4. Orders

**Bảng 4. Bảng: orders**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| user_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng users |
| payments | JSON | Thông tin thanh toán (Square Payment API response) |
| note | VARCHAR(255) | Ghi chú đơn hàng |
| discount_code_id | BIGINT (Foreign Key, Nullable) | Khóa ngoại đến bảng discount_codes |
| address_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng addresses |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Bảng 4a. Bảng pivot: order_product**

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| id | BIGINT (Primary Key, Auto Increment) | Khóa chính |
| order_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng orders |
| product_id | BIGINT (Foreign Key) | Khóa ngoại đến bảng products |
| quantity | INTEGER | Số lượng sản phẩm trong đơn |
| created_at | TIMESTAMP | Thời gian tạo |
| updated_at | TIMESTAMP | Thời gian cập nhật |

**Quan hệ:**
- `belongsTo(User)` - Đơn hàng thuộc một user
- `belongsTo(Address)` - Đơn hàng có một địa chỉ giao hàng
- `belongsTo(DiscountCode)` - Đơn hàng có thể áp dụng một mã giảm giá
- `belongsToMany(Product)` - Đơn hàng chứa nhiều sản phẩm (pivot: quantity)

### 3.3.1.5. Các bảng hỗ trợ khác

**Categories (Danh mục sản phẩm):**
- Quản lý danh mục sản phẩm với cấu trúc parent-child
- Hỗ trợ nhiều cấp danh mục

**Brands (Thương hiệu):**
- Quản lý thương hiệu sản phẩm
- Mỗi sản phẩm thuộc một thương hiệu

**Addresses (Địa chỉ giao hàng):**
- Quản lý địa chỉ của user
- Liên kết với bảng cities, districts, wards (địa chỉ Việt Nam)

**Reviews (Đánh giá sản phẩm):**
- Người dùng đánh giá sản phẩm
- Tích hợp AI reply tự động qua n8n

**Hot Deals, Flash Deals, Discount Codes:**
- Quản lý các chương trình khuyến mãi
- Hot Deals: khuyến mãi theo thời gian
- Flash Deals: deal nhanh, thời gian giới hạn
- Discount Codes: mã giảm giá

## 3.3.2. Lý do sử dụng MySQL với Master-Slave Replication

### 3.3.2.1. MySQL 8.0
- **Cấu trúc dữ liệu rõ ràng:** Dữ liệu sản phẩm mỹ phẩm có cấu trúc cố định, phù hợp với relational database
- **ACID compliance:** Đảm bảo tính nhất quán dữ liệu cho các giao dịch thanh toán
- **Foreign key constraints:** Đảm bảo tính toàn vẹn dữ liệu giữa các bảng
- **Performance:** MySQL được tối ưu tốt cho các truy vấn phức tạp với JOIN
- **Ecosystem:** Laravel framework được tối ưu tốt với MySQL

### 3.3.2.2. Master-Slave Replication
- **High Availability:** Slave database đóng vai trò backup, đảm bảo hệ thống vẫn hoạt động nếu Master gặp sự cố
- **Read Scalability:** Có thể phân tải đọc từ Slave database để giảm tải cho Master
- **Data Redundancy:** Dữ liệu được sao chép tự động từ Master sang Slave
- **Dual Write Mechanism:** Laravel được cấu hình để ghi dữ liệu vào cả Master và Slave databases, đảm bảo đồng bộ ngay lập tức
- **Railway Cloud Platform:** Dễ dàng triển khai và quản lý 2 MySQL instances trên Railway

### 3.3.2.3. Dual Database Write
- **Trait SyncsToSlaveDatabase:** Tự động sync dữ liệu sang Slave database khi có thay đổi
- **Trait HasBelongsToManyWithSync:** Xử lý sync cho quan hệ many-to-many
- **DualDatabaseService:** Service class xử lý các thao tác ghi vào cả 2 databases
- **Transaction Safety:** Đảm bảo tính nhất quán dữ liệu giữa Master và Slave

## 3.4. Các API chính

### 3.4.1. API cho tài khoản người dùng

#### Đăng ký
**POST /api/register**
- Nhận: `first_name`, `last_name`, `email`, `password`, `birth`, `gender`
- Mã hóa mật khẩu bằng bcrypt (Laravel tự động)
- Tạo user mới
- Trả về: User resource với token (Laravel Sanctum)

#### Đăng nhập
**POST /api/login**
- Nhận: `email`, `password`
- Kiểm tra thông tin và tạo token nếu hợp lệ
- Trả về: User resource với token (Laravel Sanctum)

#### Đăng xuất
**POST /api/logout**
- Yêu cầu: Authentication token
- Xóa token hiện tại
- Trả về: Thông báo thành công

#### Lấy thông tin user hiện tại
**GET /api/user**
- Yêu cầu: Authentication token
- Trả về: Thông tin user hiện tại

#### Xác thực email
**POST /api/verify-email**
- Nhận: `email`, `code`
- Xác thực mã code và cập nhật `email_verified_at`

#### Lấy danh sách users
**GET /api/users**
- Dành cho admin
- Hỗ trợ phân trang (`paginate`, `page`)
- Trả về: Danh sách users với phân trang

#### Xóa người dùng
**DELETE /api/users/{id}**
- Dành cho admin
- Xóa user theo ID

### 3.4.2. API cho sản phẩm

#### Lấy danh sách sản phẩm
**GET /api/products**
- Hỗ trợ phân trang (`paginate`, `page`)
- Hỗ trợ tìm kiếm (`search`)
- Hỗ trợ loại trừ sản phẩm (`excluding` - danh sách ID phân cách bằng dấu phẩy)
- Cache kết quả trong 60 giây
- Trả về: `ProductResource` collection với pagination, kèm categories, brand, reviews

#### Lấy sản phẩm theo ID hoặc URL slug
**GET /api/products/{id}** hoặc **GET /api/products/{url}**
- Trả về: Thông tin chi tiết sản phẩm với đầy đủ relationships
- 404 nếu ID/slug không hợp lệ hoặc không tồn tại

#### Tạo sản phẩm mới
**POST /api/products**
- Yêu cầu: Authentication token (admin)
- Nhận: Dữ liệu sản phẩm trong body
- Tự động tạo URL slug từ name
- Gửi thông báo real-time qua Socket.io
- Gửi webhook đến n8n
- Trả về: Sản phẩm vừa tạo

#### Cập nhật sản phẩm
**PUT /api/products/{id}**
- Yêu cầu: Authentication token (admin)
- Cập nhật dữ liệu sản phẩm theo ID
- Gửi thông báo real-time qua Socket.io
- Trả về: Sản phẩm vừa cập nhật
- 404 nếu sản phẩm không tồn tại

#### Xóa sản phẩm
**DELETE /api/products/{id}**
- Yêu cầu: Authentication token (admin)
- Xóa sản phẩm theo ID
- Gửi thông báo real-time qua Socket.io
- Trả về: Thông báo thành công hoặc 404 nếu không tồn tại

### 3.4.3. API cho danh mục (Categories)

#### Lấy danh sách danh mục
**GET /api/categories**
- Trả về: Danh sách tất cả danh mục với quan hệ parent-children
- Cache kết quả

#### Lấy danh mục con (leaf categories)
**GET /api/categories-children**
- Trả về: Danh sách các danh mục con (không có danh mục con)
- Cache kết quả

#### Lấy chi tiết danh mục
**GET /api/categories/{id}**
- Trả về: Chi tiết danh mục với products

#### Tạo danh mục mới
**POST /api/categories**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

#### Cập nhật danh mục
**PUT /api/categories/{id}**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

#### Xóa danh mục
**DELETE /api/categories/{id}**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

### 3.4.4. API cho thương hiệu (Brands)

#### Lấy danh sách thương hiệu
**GET /api/brands**
- Trả về: Danh sách tất cả thương hiệu

#### Lấy chi tiết thương hiệu
**GET /api/brands/{id}**
- Trả về: Chi tiết thương hiệu với products

#### Tạo thương hiệu mới
**POST /api/brands**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

#### Cập nhật thương hiệu
**PUT /api/brands/{id}**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

#### Xóa thương hiệu
**DELETE /api/brands/{id}**
- Yêu cầu: Authentication token (admin)
- Gửi thông báo real-time qua Socket.io

### 3.4.5. API cho giỏ hàng

#### Lấy giỏ hàng của người dùng
**GET /api/carts**
- Yêu cầu: Authentication token
- Trả về: Giỏ hàng của user với danh sách sản phẩm và số lượng
- Nếu chưa có giỏ hàng: tự động tạo mới

#### Thêm sản phẩm vào giỏ hàng
**POST /api/carts**
- Yêu cầu: Authentication token
- Nhận: `product_id` và `quantity` trong body
- Nếu chưa có giỏ hàng thì tạo mới
- Nếu sản phẩm đã có trong giỏ: cập nhật quantity
- Trả về: Giỏ hàng đã cập nhật

#### Cập nhật số lượng sản phẩm
**PUT /api/carts/{id}**
- Yêu cầu: Authentication token
- Nhận: `quantity` trong body
- Cập nhật số lượng sản phẩm tương ứng trong giỏ
- 404 nếu sản phẩm hoặc giỏ hàng không tồn tại
- Trả về: Giỏ hàng đã cập nhật

#### Xóa sản phẩm khỏi giỏ hàng
**DELETE /api/carts/{id}**
- Yêu cầu: Authentication token
- Xóa sản phẩm tương ứng trong giỏ
- Trả về: Giỏ hàng đã cập nhật

### 3.4.6. API cho đơn hàng

#### Tạo đơn hàng
**POST /api/orders**
- Yêu cầu: Authentication token
- Nhận: `payments` (JSON), `note`, `discount_code_id`, `address_id`, `products` (array)
- Kiểm tra: có sản phẩm và địa chỉ
- Tạo đơn mới, xóa giỏ hàng sau khi tạo đơn
- Gửi email xác nhận đơn hàng cho khách hàng
- Gửi thông báo real-time cho admin qua Socket.io
- Gửi webhook đến n8n
- Trả về: Đơn vừa tạo với đầy đủ relationships

#### Lấy đơn hàng của user hiện tại
**GET /api/orders**
- Yêu cầu: Authentication token
- User thường: Trả về tất cả đơn của user hiện tại
- Admin: Trả về tất cả đơn hàng với phân trang và tìm kiếm
- Hỗ trợ phân trang (`paginate`)
- Hỗ trợ tìm kiếm (`search` - theo tên, email user hoặc ID đơn)

#### Lấy chi tiết đơn hàng
**GET /api/orders/{id}**
- Yêu cầu: Authentication token
- User: Chỉ xem được đơn của chính mình
- Admin: Xem được tất cả đơn
- Trả về: Chi tiết đơn với đầy đủ relationships
- 403 nếu user không được phép

#### Cập nhật trạng thái đơn hàng
**PUT /api/orders/{id}**
- Yêu cầu: Authentication token (admin)
- Nhận: Dữ liệu cập nhật trong body
- Cập nhật thông tin đơn hàng
- Gửi email thông báo cho khách hàng
- Gửi thông báo real-time cho user qua Socket.io

### 3.4.7. API cho địa chỉ

#### Lấy danh sách địa chỉ
**GET /api/addresses**
- Yêu cầu: Authentication token
- Trả về: Danh sách địa chỉ của user hiện tại

#### Tạo địa chỉ mới
**POST /api/addresses**
- Yêu cầu: Authentication token
- Nhận: Thông tin địa chỉ (name, phone, street_address, ward, district, province)

#### Cập nhật địa chỉ
**PUT /api/addresses/{id}**
- Yêu cầu: Authentication token
- Cập nhật địa chỉ theo ID

#### Xóa địa chỉ
**DELETE /api/addresses/{id}**
- Yêu cầu: Authentication token
- Xóa địa chỉ theo ID

### 3.4.8. API cho đánh giá (Reviews)

#### Lấy danh sách đánh giá
**GET /api/reviews**
- Hỗ trợ filter theo `product_id`
- Trả về: Danh sách đánh giá với thông tin user

#### Tạo đánh giá mới
**POST /api/reviews**
- Yêu cầu: Authentication token
- Nhận: `product_id`, `rating`, `comment`
- Tự động gửi webhook đến n8n để tạo AI reply
- Gửi thông báo real-time qua Socket.io

#### Lưu phản hồi AI
**POST /api/reviews/ai-reply**
- Nhận: `review_id`, `ai_reply`
- Lưu phản hồi AI từ n8n vào database
- Gửi thông báo real-time qua Socket.io

### 3.4.9. API cho thanh toán

#### Xử lý thanh toán
**POST /api/payments**
- Yêu cầu: Authentication token
- Nhận: Thông tin thanh toán
- Tích hợp với Square Payment API
- Trả về: Kết quả thanh toán

### 3.4.10. API cho Hot Deals, Flash Deals, Discount Codes

#### Hot Deals
- **GET /api/hot-deals** - Lấy danh sách hot deals
- **POST /api/hot-deals** - Tạo hot deal mới (admin)
- **PUT /api/hot-deals/{id}** - Cập nhật hot deal (admin)
- **DELETE /api/hot-deals/{id}** - Xóa hot deal (admin)

#### Flash Deals
- **GET /api/flash-deals** - Lấy danh sách flash deals
- **POST /api/flash-deals** - Tạo flash deal mới (admin)
- **PUT /api/flash-deals/{id}** - Cập nhật flash deal (admin)
- **DELETE /api/flash-deals/{id}** - Xóa flash deal (admin)

#### Discount Codes
- **GET /api/discount-codes** - Lấy danh sách mã giảm giá
- **POST /api/discount-codes** - Tạo mã giảm giá mới (admin)
- **PUT /api/discount-codes/{id}** - Cập nhật mã giảm giá (admin)
- **DELETE /api/discount-codes/{id}** - Xóa mã giảm giá (admin)

### 3.4.11. API cho địa chỉ Việt Nam

#### Lấy danh sách tỉnh/thành phố
**GET /api/list_cities**
- Trả về: Danh sách tỉnh/thành phố (City, District, Ward)

### 3.4.12. API liên hệ

#### Gửi liên hệ
**POST /api/contact**
- Nhận: `name`, `email`, `message`
- Gửi webhook đến n8n để xử lý
- Trả về: Thông báo thành công

## 3.4.13. Luồng hoạt động API

1. **React Frontend** gửi request qua Axios đến Laravel API
2. **Laravel Routing** (`routes/api.php`) tiếp nhận request
3. **Middleware** xử lý authentication (Laravel Sanctum) nếu cần
4. **Controller** xử lý logic nghiệp vụ
5. **Model (Eloquent ORM)** truy cập MySQL database (Master hoặc Slave)
6. **Dual Database Write** tự động sync dữ liệu sang Slave database (nếu có thay đổi)
7. **API Resource** transform dữ liệu trước khi trả về
8. **Socket.io** gửi thông báo real-time (nếu có sự kiện)
9. **n8n Webhook** được gọi (nếu cần xử lý automation)
10. Dữ liệu trả về dạng JSON cho Frontend

### 3.4.14. Real-time Communication Flow

1. **Laravel Backend** phát sinh event (ví dụ: đơn hàng mới, sản phẩm mới)
2. Event được broadcast qua **Redis**
3. Laravel gửi HTTP request đến **Socket Server** (Express.js trên Railway)
4. **Socket Server** emit event qua **Socket.io**
5. **Frontend** nhận event qua Socket.io Client và cập nhật UI real-time

### 3.4.15. n8n Workflow Integration

n8n được tích hợp để xử lý:
- **AI Review Replies:** Tự động phản hồi đánh giá bằng AI
- **Order Notifications:** Gửi thông báo khi có đơn hàng mới
- **Contact Form Processing:** Xử lý form liên hệ

Laravel gọi n8n webhooks qua HTTP requests với timeout 2 giây để tránh block request.

