from pymongo import MongoClient
mongo = MongoClient("mongodb://18.139.174.176:27017",username = 'Admin',password = 'yckcmkg')

def get_book_by_asin(asin):
    return mongo['Kindle']['Metadata'].find_one({"asin":asin})

def get_book_summary(asin):
    metadata_collection = mongo['Kindle']['Metadata']
    return metadata_collection.find_one({"asin":asin},{"title":True,"asin":True,"imUrl":True,"description":True})


def add_book(json):
    metadata_collection = mongo['Kindle']['Metadata']
    x = metadata_collection.insert_one(json)
    #print("added")
    return True