from flask import Flask, url_for, request, jsonify
from pymongo import MongoClient
import mysql.connector as db
from bson import Binary, Code
from bson.json_util import dumps, loads
import reviews
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
@app.route('/books/<asin>',methods=['GET'])
def get_books_by_asin(asin):
	## MongoDb
	return_value = {}
	title_query = {"asin":{"$regex":asin}}
	metadata_collection = mongo['Kindle']['Metadata']
	summary = request.args.get('summary',default=0,type=int)
	if(summary==1):
		query_result = metadata_collection.find(title_query,{"title":True,"asin":True,"imUrl":True,"description":True})
		for result in query_result:	
			return_value["metadata"] = result
		return dumps(return_value) , 200
	query_result = metadata_collection.find(title_query,{"related.buy_after_viewing":False,"related.also_bought":False})
	for result in query_result:	
		return_value["metadata"] = result
	# MySQL
	cursor = sql.cursor(prepared=True)
	cursor.execute("""SELECT * FROM `Reviews` where asin = %s""",(asin,))
	result = cursor.fetchall()
	return_value["reviews"] = result
	return dumps(return_value) , 200

@app.route('/reviews/<id>')
def get_reviews_by_id(id):
	cursor = sql.cursor(prepared=True)
	cursor.execute("""SELECT asin,reviewText,reviewerID FROM `Reviews` where asin = %s""",(id,))
	result = cursor.fetchall()
	print(result)
	return jsonify(result) , 200


@app.route('/add/book',methods=['POST'])
def add_new_book():
	metadata_collection = mongo['Kindle']['Metadata']
	data = request.json
	x = metadata_collection.insert_one(data)
	return '',200

@app.route('/book/<asin>',methods=['POST'])
def add_review(asin):
	"""
	POST
	params in json
	helpful(optional), overall, reviewText, reviewTime(optional), reviewerID, reviewerName, summary, unixReviewTime(optional)
	"""
	json_dict = request.get_json()
	try:
		succeeded = reviews.add_review(asin,json_dict)
		if succeeded:
			return {},200
		else:
			return {},500
	except KeyError as e:
		return {"key not found":e},400
	except Exception as e:
		return {"Exception":e},500
if __name__ == '__main__':
	app.run(debug=True)