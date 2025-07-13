from selenium import webdriver
from bs4 import BeautifulSoup
import json

list_brands = []

with open("new_brands.json", 'r', encoding="utf-8") as f:
    brands = json.load(f)


def getElements(url):
    driver = webdriver.Chrome()
    driver.get(url)
    
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    elements = {
    "name":soup.select_one(".bg-white .m-auto.container .flex.gap-4.p-5.pb-0.bg-white .w-full.text-sm h1").text,
    "description":soup.select_one(".bg-white .m-auto.container .flex.gap-4.p-5.pb-0.bg-white .w-full.text-sm div").text
    }
    return elements


for brand in brands:
    list_brands.append(getElements(brand))

with open("list_brands", 'w', encoding="utf-8") as file:
    json.dump(list_brands, ensure_ascii=False, indent=4)
