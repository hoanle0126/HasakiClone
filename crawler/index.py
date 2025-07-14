from playwright.sync_api import sync_playwright
import json
import time

with open("list_url.json", 'r', encoding="utf-8") as file:
    urls = json.load(file)

list_products = []


def addProduct(url):
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=300)
        context = browser.new_context(user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ))
        page = context.new_page()
        
        def handle_response(response):
            if "product?" in response.url:
                try:
                    json_data = response.json()
                    list_products.append(json_data)
                    with open("products.json", 'w', encoding="utf-8") as file:
                        json.dump(list_products, file, ensure_ascii=False, indent=4)
                except:
                    pass
        
        page.on("response", handle_response)
        
        page.goto(url, timeout=60000)
        time.sleep(5)
        browser.close()


for index, url in enumerate(urls):
    addProduct(url)
    print(f" {index}, Thêm sản phẩm: {url}")

