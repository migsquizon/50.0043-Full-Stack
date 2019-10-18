from flask import Flask, url_for, request, jsonify
from pymongo import MongoClient
import mysql.connector as db
from bson import Binary, Code
from bson.json_util import dumps, loads
import reviews
import metadata
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
@app.route('/book/<asin>',methods=['GET'])
def get_book_by_asin(asin):
	"""
	verbose
	1: returns summary only
	2: returns metadata and reviews
	3: return metadata and summary of suggested books 
	"""
	verbose = request.args.get('verbose',default=2,type=int)
	also_bought = request.args.get('also_bought',default=1,type=int)
	buy_after_viewing = request.args.get('buy_after_viewing',default=1,type=int)
	num_reviews = request.args.get('num_reviews',default=5,type=int)
	try:
		if verbose == 1:
			book = metadata.get_book_summary(asin)
			return dumps(metadata.get_book_summary(asin)),200
		if verbose == 2:
			book = metadata.get_book_by_asin(asin)
			book['reviews'] = reviews.get_reviews(asin,num_reviews)
			return dumps(book),200
		if verbose == 3:
			main_book = metadata.get_book_by_asin(asin)
			#dont want to throw exception if there is no related books
			#Limit 5 books or maxL allowed only for speed
			if 'related' in main_book:
				if 'also_bought' in main_book['related']:
					alsoboughtls = main_book['related']['also_bought']
					length = min(len(alsoboughtls),also_bought,5)
					ls = []
					for i in range(length):
						ls.append(metadata.get_book_summary(alsoboughtls[i]))
					main_book['related']['also_bought'] = ls
				if 'buy_after_viewing' in main_book['related']:
					buyafterviewingls = main_book['related']['buy_after_viewing']
					length1 = min(len(buyafterviewingls),buy_after_viewing,5)
					ls1 = []
					for i in range(length1):
						ls1.append(metadata.get_book_summary(buyafterviewingls[i]))
					main_book['related']['buy_after_viewing'] = ls1
				main_book['reviews'] = reviews.get_reviews(asin,num_reviews)
			return dumps(main_book)
	except Exception as e:
		return {"Exception":e},500

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
		return {"keyError":e},400
	except Exception as e:
		return {"Exception":e},500
if __name__ == '__main__':
	app.run(debug=True)