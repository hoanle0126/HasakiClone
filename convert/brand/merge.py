import json

# Giả sử đây là dữ liệu đầu vào
with open('grouped_lists.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Gộp tất cả các phần tử trong các list lại thành một mảng
combined_list = []
for group in data:
    combined_list.extend(group.get("list", []))  # an toàn khi "list" có thể không tồn tại

# Xuất ra file JSON
with open('merged_list.json', 'w', encoding='utf-8') as f:
    json.dump(combined_list, f, indent=2, ensure_ascii=False)

print("✅ Xuất file thành công: merged_list.json")
