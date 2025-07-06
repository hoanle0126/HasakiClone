import json
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import requests


def scrape_product(product_id: str):
    product_url = f"https://hasaki.vn/san-pham/san-pham-{product_id}.html"
    matched_url_fragment = f"product?product_id={product_id}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        product_data = {}

        def handle_response(response):
            if matched_url_fragment in response.url:
                print(f"[🎯] Đã bắt được API: {response.url}")
                try:
                    data = response.json()
                    product_data.update(data)  # Cập nhật vào biến ngoài
                except:
                    print("[⚠️] Không thể parse JSON.")

        page.on("response", handle_response)

        print(f"[🔎] Mở trang sản phẩm: {product_url}")
        page.goto(product_url)
        page.wait_for_timeout(5000)  # Chờ JS tải xong

        browser.close()

        if product_data:
            # file_name = f"product_{product_id}.json"
            # with open(file_name, "w", encoding="utf-8") as f:
            #     json.dump(product_data, f, ensure_ascii=False, indent=2)
            # print(f"[✅] Đã lưu dữ liệu vào {file_name}")
            return product_data
        else:
            print("[❌] Không bắt được dữ liệu sản phẩm.")


# Đọc nội dung từ file HTML
with open('products.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'lxml')
product_list = []
product_list2 = []

# Tìm toàn bộ div sản phẩm bên trong khối ProductGrid
product_blocks = soup.select('.ProductGrid__grid .ProductGridItem__itemOuter')

for block in product_blocks:
    info_tag = block.select_one('.block_info_item_sp')
    if not info_tag:
        continue

    product = info_tag.get("data-product", "")
    
    product_list.append(product)

for item in product_list:
    product_list2.append(scrape_product(item))
    file_name = f"product_1.json"
    with open(file_name, "w", encoding="utf-8") as f:
        json.dump(product_list2, f, ensure_ascii=False, indent=2)
    print(f"[✅] Đã lưu dữ liệu vào {file_name}")
