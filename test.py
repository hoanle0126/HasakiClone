import requests
from bs4 import BeautifulSoup
import re
import math

products_id = []
url = "https://hasaki.vn/danh-muc/nuoc-hoa-c103.html"


def getCountPage():
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "lxml")
    block = soup.find("div", class_="block_tit_folder").find("h4").text.strip()
    number = int(re.search(r'\d+', block).group())
    return math.ceil(number / 40)

    
count = getCountPage()


def getAllIdInPage(id):
    response = requests.get(url + "?p=" + str(id))
    soup = BeautifulSoup(response.content, "lxml")
    products = soup.find_all("div", class_="ProductGridItem__itemOuter")
    for product in products:
        products_id.append(product.select_one(".block_info_item_sp").get("data-product"))


for id_ in range(1, count):
    getAllIdInPage(id_)

print(len(products_id), products_id)
