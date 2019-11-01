import requests
import re
from bs4 import BeautifulSoup
# simulates browser as amazon blocks scraping
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64;     x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate",     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}
def get_missing_info(asin):
    """
    param asin 
    output title, author
    may not always return appropriate data use try catch for unknown errors
    """
    page = requests.get("https://www.amazon.com/dp/{}".format(asin),headers=headers).content
    soup = BeautifulSoup(page,features='lxml')
    bookData = soup.find(id='booksTitle')
    title = bookData.find('span',id=re.compile('.*T?itle.*')).string
    authorData = bookData.find('span',class_=re.compile('.*a?uthor.*'))
    author = authorData.find('a',class_='a-link-normal contributorNameID') #get more specific data if exists
    if author == None:
        author = authorData.find('a')
    return title.strip(),author.string.strip()
if __name__=='__main__':
    #some tests
    print(get_missing_info('B009EALX3K'))
    print(get_missing_info('B000F83TEQ'))
    print(get_missing_info('B000F83STC'))
