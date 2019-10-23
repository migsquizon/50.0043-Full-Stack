from flask import Flask, url_for, request, jsonify
from pymongo import MongoClient
import mysql.connector as db
from bson import Binary, Code
from bson.json_util import dumps, loads
from functools import wraps
import jwt
import reviews
import metadata
import users
app = Flask(__name__)

mongo = MongoClient("mongodb://18.139.174.176:27017",username = 'Admin',password = 'yckcmkg')

sql = db.connect(host="18.139.174.176", user="root", password='yckcmkg', db="Reviews")

app.config['SECRET_KEY'] = 'yckcmkg'


def token_required(f):
	@wraps(f)
	def wrapper(*args,**kwargs):
		token = request.args.get('token')
		try:
			jwt.decode(token,app.config['SECRET_KEY'])
			return f(*args,**kwargs)
		except:
			return 'Error: need a valid token for request',401
	return wrapper

@app.route('/mongo')
@token_required
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
                print(e)
                return {"Exception":str(e)},500

@app.route('/reviews/<asin>')
def get_reviews_by_asin(asin):
	try:
		result = reviews.get_reviews(asin)
	except Exception as e:
                print(e)
                return {"Exception": str(e)},500
	return jsonify(result) , 200


@app.route('/add/book',methods=['POST'])
def add_new_book():
	json_dict = request.get_json()
	try:
		succeeded = metadata.add_book(json_dict)
		if succeeded:
			return {},200
		else:
			return {},500
	except KeyError as e:
                print(e)
                return {"keyError":str(e)},400
	except Exception as e:
                print(e)
                return {"Exception":str(e)},500

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
                print(e)
                return {"keyError":str(e)},400
	except Exception as e:
                print(e)
                return {"Exception":str(e)},500

@app.route('/reviews/helpful/<asin>',methods=["POST"])
def helpful(asin):
    #json_post will give me reviewerID & helpful
    #helpful should be 1 if review was helpful, 0 if not helpful
    json_post = request.get_json()
    try:
        helpful = json_post["helpful"]
        reviewerID = json_post["reviewerID"]
        review = reviews.get_review_by_id(asin,reviewerID)
        helpfulness =  review[0]["helpful"]
        if(helpful == "1"):
            comma = helpfulness.find(",")
            helpful_digit = helpfulness[1:comma]
            helpful_int = int(helpful_digit)
            helpful_int += 1
            final_rating = helpfulness[0]+str(helpful_int)+helpfulness[comma:]
        if(helpful == "0"):
            comma = helpfulness.find(",")
            helpful_digit = helpfulness[comma+2:comma+3]
            helpful_int = int(helpful_digit)
            helpful_int += 1
            final_rating = helpfulness[:comma+2]+str(helpful_int)+"]"
        else:
            return ("helpful value not equals to 1 or 0")
        reviews.update_helpful(asin,reviewerID,final_rating) 
        review = reviews.get_review_by_id(asin,reviewerID)
        return review[0]
    except KeyError as e:
                print(e)
                return {"keyError":str(e)},400
    except Exception as e:
                print(e)
                return {"Exception":str(e)},500

    



@app.route('/signup',methods=['POST'])
def sign_up():
	"""
	POST
	user sign up, adds the user data into the mongodb
	returns status code
	"""
	user_json = request.get_json()
	try:
		if(users.get_user_details(user_json['username']) is not None):
			print('username is taken')
			return 'Sorry, the username {} has been taken'.format(user_json['username']), 400
		users.add_user(user_json)
		return {},200
	except KeyError as e:
		return {"keyError":str(e)},400
	except Exception as e:
		print(e)
		return {"Exception":str(e)},500

@app.route('/signin',methods=['POST'])
def sign_in():
	"""
	POST
	user sign in, verification of user data. Once verified, sign in -> token acquired
	returns jwt token
	"""
	sign_in_json = request.get_json()
	user_data = users.get_user_details(sign_in_json['username'])
	if (user_data is None):
		return 'Sorry, you need a valid account to sign in. This username has not been registered.' , 400
	try:
		if not (users.verify_user_password(sign_in_json['password'],user_data['password'])):
			print('failed verification')
			return 'Sorry but you have given the wrong password', 400
		token = jwt.encode({},app.config['SECRET_KEY'],algorithm='HS256')
		return token.decode('utf-8'),200
	except KeyError as e:
		return {"keyError":str(e)},400
	except Exception as e:
		print(e)
		return {"Exception":str(e)},500









if __name__ == '__main__':
	app.run(debug=True)
