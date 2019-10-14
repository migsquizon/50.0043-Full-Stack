from flask import Flask, render_template, url_for, request, jsonify
from pymongo import MongoClient
import mysql.connector as db
from flask_wtf import FlaskForm
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
	#for meta in metadata.find({},{'_id': False,"title":1}):
	 #   print(meta)
	#print(mongo.database_names())
	#print(db.list_collection_names())
	return dumps(metadata.find_one())

@app.route('/sql')
def test_sql():
	cursor = sql.cursor()
	cursor.execute("SELECT * FROM `Reviews` LIMIT 0, 10")
	res = cursor.fetchall()
	print(res)
	#cursor.execute("select * from Payroll")
	#res = cursor.fetchall()
	#print(res)
	return


@app.route('/books/<query>')
def get_books_by_description(query):
	return_value = {}
	books = []
	title_query = {"description":{"$regex":query}}
	metadata_collection = mongo['Kindle']['Metadata']
	query_result = metadata_collection.find(title_query,{"__id":True,"description":1})
	for result in query_result:
		books.append(result)	
		return_value = {"books": books}
	return dumps(return_value)

@app.route('/reviews/<id>')
def get_reviews_by_id(id):
	cursor = sql.cursor(prepared=True)
	cursor.execute("""SELECT asin,reviewText,reviewerID FROM `Reviews` where asin = %s""",(id,))
	result = cursor.fetchall()
	print(result)
	return jsonify(result)

@app.route('/index',methods=['GET','POST'])
def index():
	return render_template('index.html')

@app.route('/404')
def error():
	return render_template('404.html')


if __name__ == '__main__':
	app.run(debug=True)