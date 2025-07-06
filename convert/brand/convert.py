import json

# Đọc dữ liệu từ file gốc (bạn có thể thay thế bằng dữ liệu copy nếu không dùng file)
with open('brands.json', 'r', encoding='utf-8') as f:
    data = json.load(f)


# Hàm rút gọn mỗi sản phẩm
def simplify_product(product):

    return {
        "id": product["id"],
        "name": product["name"],
        "logo": product["image"],
        "thumbnail": product["cover"],
    }


# Rút gọn danh sách sản phẩm
simplified = [simplify_product(p) for p in data]

# Ghi ra file JSON mới
with open('simplified_products.json', 'w', encoding='utf-8') as f:
    json.dump(simplified, f, indent=2, ensure_ascii=False)

print("✅ Xuất file thành công: simplified_products.json")
