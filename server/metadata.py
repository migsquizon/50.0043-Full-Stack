from pymongo import MongoClient
import re
from app import app

mongo_ip = app.config['MONGO_IP']
print(mongo_ip)
mongo = MongoClient(f"mongodb://{mongo_ip}:27017")

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
    if not (json["title"] and json["imUrl"] and json["asin"] and json["categories"] and json['added_by'] ):
        raise KeyError("Missing required fields for add book : FIELD IS EMPTY")
    x = metadata_collection.insert_one(json)
    return True

def get_books_by_category(category,limit=20):
    metadata_collection = mongo['Kindle']['Metadata']
    regexp = re.compile('{}'.format(category),re.IGNORECASE)
    elemMatch = {'$elemMatch':{'$in':[regexp]}} #regular expression ignore case and find all values matching
    return metadata_collection.find({"categories":{"$elemMatch":elemMatch}},{"title":True,"asin":True,"imUrl":True,"description":True}).limit(limit)

def get_summaries(limit=20):
    metadata_collection = mongo['Kindle']['Metadata']
    return metadata_collection.find().limit(limit)

def test_mongo():
    return mongo['Kindle']['Metadata'].find_one()

def test_connection():
    try:
        mongo.admin.command('ismaster')
        return True
    except:
        return False
# print(list(get_book_summary_list(["B0002IQ15S","B000FA5RE4"])))

# metadata_collection = mongo['Kindle']['Metadata']
# print(list(metadata_collection.find().limit(10)))

# print(list(get_summaries()))
# print(list(get_books_by_category('fit',5)))