from pymongo import MongoClient
mongo = MongoClient("mongodb://18.140.90.36:27017",username = 'Admin',password = 'yckcmkg')

def get_book_by_asin(asin):
    return mongo['Kindle']['Metadata'].find_one({"asin":asin})

def get_book_summary(asin):
    metadata_collection = mongo['Kindle']['Metadata']
    return metadata_collection.find_one({"asin":asin},{"title":True,"asin":True,"imUrl":True,"description":True})

def get_book_summary_list(asin_list,limit=5):
    metadata_collection = mongo['Kindle']['Metadata']
    return metadata_collection.find({"asin":{"$in":asin_list}},{"title":True,"asin":True,"imUrl":True,"description":True}).limit(limit)

def add_book(json):
    metadata_collection = mongo['Kindle']['Metadata']
    if "title" not in json or "imUrl" not in json or "asin" not in json or "categories" not in json or "added_by" not in json:
        raise KeyError("Book credentials are insufficient")
    x = metadata_collection.insert_one(json)
    return True

def test_mongo():
    return mongo['Kindle']['Metadata'].find_one()
# print(list(get_book_summary_list(["B0002IQ15S","B000FA5RE4"])))