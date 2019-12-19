import mysql.connector as db
import time
from datetime import date
import csv
from bson import BSON
from bson import json_util
from pymongo import MongoClient
import re
import json
import sys
#mongo = MongoClient("mongodb://18.140.5.194")
dns_mongo = sys.argv[1]
dns_sql = sys.argv[2]
mongo = MongoClient(dns_mongo)
#sql = db.connect(host="3.0.139.44", user="root", db="Reviews")
sql = db.connect(host=dns_sql, user="root", db="Reviews")


def download_sql():
       # cursor = sql.cursor(dictionary=True)
        cursor = sql.cursor()
        cursor.execute(""" SELECT * FROM `Reviews` """)
        rows = cursor.fetchall()
        fp = open('etl_sql_reviews.csv', 'w')
        myFile = csv.writer(fp)
        columns = [i[0] for i in cursor.description]
        #print(list(columns))
        myFile.writerow(list(columns))
        for row in rows:
                # print(list(row))
	# print(type(row))
	# print(row.values())
                #myFile.writerow(list(row.values()))
                myFile.writerow(row)
	# print(feature)
        fp.close()


# def download_mongo():
#    metadata_collection = mongo['Kindle']['Metadata']
#    cursor = metadata_collection.find({})
#    mongo_docs = list(cursor)
#    return json.dumps(doc, sort_keys=True, indent=4, default=json_util.default)

def download_mongo():
	metadata_collection = mongo['Kindle']['Metadata']
	cursor = metadata_collection.find({},{'_id':False})
	#print('helllo')
	data =  cursor #json_util.dumps(cursor)
	#print(data)
	with open('etl_mongo_metadata.json','w') as f:
		for d in data:
			#print(d)
			json.dump(d,f)
			f.write("\n")
	f.close()
	return
	# json
	# for d in data:
#   		json.dump(d,f)


print('saving now')
download_sql()
print('sql done')
download_mongo()
print('mongo done')

