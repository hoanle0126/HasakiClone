from bs4 import BeautifulSoup
import requests
import json
import re
import math

list_ids = []

url = "https://hasaki.vn/danh-muc/suc-khoe-lam-dep-c3.html"

soup = BeautifulSoup(requests.get(url).text, "html.parser")
text = soup.select_one("#list_sp_col_right .block_tit_folder .txt_999").text
count = math.ceil(int(re.search(r"\((\d+)", text).group(1)) / 40)

for page in range(1, count + 1):
    print(f"Lấy url ở page {page}")
    url2 = f"https://hasaki.vn/danh-muc/suc-khoe-lam-dep-c3.html?p={page}"

    soup2 = BeautifulSoup(requests.get(url2).text, "html.parser")

    url_product = [a['href'] for a in soup2.select(".ProductGridItem__itemOuter .item_sp_hasaki a.v3_thumb_common_sp.relative")]
    for product in url_product:
        list_ids.append(product)
    print(f"Thêm xong trang {page}, số lượng sản phẩm {len(url_product)}")

with open("list_url.json", 'w', encoding="utf-8") as file:
        json.dump(list_ids, file, ensure_ascii=False, indent=1)
