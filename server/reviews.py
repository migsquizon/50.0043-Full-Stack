import mysql.connector as db
import time
from datetime import date
from app import app
import time
sql_ip = app.config['SQL_IP']
print(sql_ip)
init = False
sql = None
def keep_alive():
    """
    Connect sql again if connection drops
    """
    global sql
    global init
    try:
        if not init:
            sql = db.connect(host=sql_ip, user="root", db="Reviews")
            init = True
    
        elif not sql.is_connected():
            sql = db.connect(host=sql_ip, user="root", db="Reviews")
    except Exception as e:
        print(e)



def test_sql():
    keep_alive()
    cursor = sql.cursor(dictionary=True)
    cursor.execute("SELECT * FROM `Reviews` LIMIT 0, 10")
    res = cursor.fetchall()
    return res
    
def get_reviews(asin,num=5):
    """
    Get all reviews with a given asin
    """
    keep_alive()
    cursor = sql.cursor(dictionary=True)
    cursor.execute("""SELECT * FROM `Reviews` where asin = %s ORDER BY unixReviewTime DESC LIMIT %s """, (asin,num))
    result = cursor.fetchall()
    return result


def get_review_count(asin):
    """
    Get review count with a given asin
    had to do asin = '%s' because of python string concatenation
    """
    keep_alive()
    cursor = sql.cursor(dictionary=True)
    cursor.execute("""SELECT COUNT(*) as count FROM `Reviews` WHERE asin = '%s' """ % asin)
    result = cursor.fetchall()
    return result

def get_overall_review(asin):
    """
    Get review count with a given asin
    had to do asin = '%s' because of python string concatenation
    """
    keep_alive()
    val = 0
    cursor = sql.cursor(dictionary=True)
    cursor.execute("""SELECT overall FROM `Reviews` WHERE asin = '%s' """ % asin)
    result = cursor.fetchall()
    if len(result)==0:
        return 0
    for dic in result:
        if dic['overall'] is None:
            continue
        val += dic['overall']
    val = val/len(result)
    return round(val,1)

def get_review_by_id(asin,reviewerID):
    """
    Get the review with a given asin and reviewerID
    """
    keep_alive()
    cursor = sql.cursor(dictionary=True)
    cursor.execute("""SELECT * FROM `Reviews` where reviewerID = %s and asin = %s LIMIT %s""", (reviewerID,asin,1))
    result = cursor.fetchall()
    return result

def update_helpful(asin,reviewerID,helpful):
    keep_alive()
    cursor = sql.cursor()
    cursor.execute("""UPDATE Reviews SET helpful = %s WHERE asin = %s and reviewerID = %s """,(helpful,asin,reviewerID))
    sql.commit()
    return True

def add_review(asin, json):
    """
    Args:
        asin (string)
        json (dictionary)
    Returns:
        bool: True if suceeded false otherwise
    """
    keep_alive()
    cursor = sql.cursor()
    reviews = ("INSERT INTO Reviews "
               "(asin, helpful, overall, reviewText, reviewTime,reviewerID, reviewerName, summary, unixReviewTime) "
               "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)")

    if "helpful" not in json:
        json["helpful"] = "[0,0]"
    if "unixReviewTime" not in json:
        json["unixReviewTime"] = int(time.time())
    if "reviewTime" not in json:
        json["reviewTime"] = str(date.today())

    helpful, overall, reviewText, reviewTime, reviewerID, reviewerName, summary, unixReviewTime = \
        json['helpful'], json['overall'], json['reviewText'], json['reviewTime'], json[
            'reviewerID'], json['reviewerName'], json['summary'], json['unixReviewTime']
    values = (asin, helpful, overall, reviewText, reviewTime, reviewerID,
              reviewerName, summary, unixReviewTime)
    # print(reviews)
    # print(values)
    cursor.execute(reviews, values)
    sql.commit()
    return True

def get_overalls(asin_arr):
    """
    params asin_arr -> array of asin to get average overall rating
    returns dictionary asin->average rating
    """
    keep_alive()
    cursor = sql.cursor()
    #done to prevent accidental sql injection
    sql_string = """SELECT asin,avg(overall) as 'avg',count(asin) as 'count' FROM `Reviews`WHERE asin IN ({}) GROUP BY ASIN;""".format(', '.join(list(map(lambda x: '%s', asin_arr))))
    cursor.execute(sql_string, asin_arr)
    result = cursor.fetchall()
    tempdic = {}
    for asin,avg,count in result:
        tempdic[asin] = (avg,count)
    return tempdic

def append_ratings(meta_ls):
    """
    meta_ls -> list of metadata dictionaries -> must contain asin
    inplace editing on list/dictionary itself so no need to return anything 
    avoid overhead of deepcopying 
    """
    asin_arr = []
    for meta in meta_ls:
        asin = meta['asin']
        asin_arr.append(asin)
    if len(asin_arr) == 0:
        return
    overalls_dic = get_overalls(asin_arr)
    for meta in meta_ls:
        asin = meta['asin']
        if asin in overalls_dic:
            meta['rating'] = float(overalls_dic[asin][0])
            meta['count'] = float(overalls_dic[asin][1])
        else:
            meta['rating'] = 0
            meta['count'] = 0


def test_connection():
    global init
    try:
        if len(test_sql())>0:
            return True
        else:
            init = False
    except Exception as e:
        print(e)
        init = False
        return False

# print(get_overalls(['B000F83SZQ','B000FA64PA']))
# add_review("123456", {
#     "overall": 5,
#     "reviewText": "test",
#     "reviewerName": "John",
#     "reviewerID":"GHJKGMHHGFFGB",
#     "summary": "book was awesome",
# })



# print((get_overall_review('B000F83SZQ')))