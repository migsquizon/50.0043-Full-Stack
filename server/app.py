from flask import Flask, url_for, request, jsonify
from pymongo import MongoClient
import mysql.connector as db
from bson import Binary, Code
from bson.json_util import dumps, loads

app = Flask(__name__)

mongo = MongoClient("mongodb://18.139.174.176:27017",username = 'Admin',password = 'yckcmkg')

sql = db.connect(host="18.139.174.176", user="root", password='yckcmkg', db="Reviews")


@app.route('/mongo')
def test_mongo():
	metadata = mongo['Kindle']['Metadata'] ## First is db name, second is metadata
	print('database connected')
	print(mongo['Kindle'].list_collection_names())
	return dumps(metadata.find_one())

@app.route('/sql')
def test_sql():
	cursor = sql.cursor()
	cursor.execute("SELECT * FROM `Reviews` LIMIT 0, 10")
	res = cursor.fetchall()
	#print(res)
	return jsonify(res)


## to be completed for parameterized
@app.route('/GET/books/<asin>',methods=['GET'])
def get_books_by_asin(asin):
	## MongoDb
	return_value = {}
	title_query = {"asin":{"$regex":asin}}
	metadata_collection = mongo['Kindle']['Metadata']
	query_result = metadata_collection.find(title_query,{"__id":0,"related.buy_after_viewing":False,"related.also_bought":False})
	for result in query_result:	
		return_value["metadata"] =result

	# MySQL
	cursor = sql.cursor(prepared=True)
	cursor.execute("""SELECT * FROM `Reviews` where asin = %s""",(asin,))
	result = cursor.fetchall()
	return_value["reviews"] = result
	return dumps(return_value)

@app.route('/reviews/<id>')
def get_reviews_by_id(id):
	cursor = sql.cursor(prepared=True)
	cursor.execute("""SELECT asin,reviewText,reviewerID FROM `Reviews` where asin = %s""",(id,))
	result = cursor.fetchall()
	print(result)
	return jsonify(result)




if __name__ == '__main__':
	app.run(debug=True)