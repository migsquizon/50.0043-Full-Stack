import mysql.connector as db
import time
from datetime import date
import csv
from bson import BSON
from bson import json_util
from pymongo import MongoClient
import re

mongo = MongoClient("mongodb://18.140.5.194")

sql = db.connect(host="3.0.139.44", user="root", db="Reviews")


def download_sql():
	cursor = sql.cursor(dictionary=True)
	cursor.execute("""SELECT * FROM `Reviews`""")
	rows = cursor.fetchall()
	fp = open('file.csv', 'w')
	myFile = csv.writer(fp)
	myFile.writerows(rows)
	fp.close()


# def download_mongo():
#    metadata_collection = mongo['Kindle']['Metadata']
#    cursor = metadata_collection.find({})
#    mongo_docs = list(cursor)
#    return json.dumps(doc, sort_keys=True, indent=4, default=json_util.default)

def download_mongo():
   metadata_collection = mongo['Kindle']['Metadata']
   cursor = metadata_collection.find({})
   data = json_util.dumps(cursor)
   with open('datanew.json','w') as f:
        json.dump(data,f)


print('saving now')
download_sql()
print('sql done')
# download_mongo()
print('mongo done')
