import mysql.connector as db
import time
from datetime import date
sql = db.connect(host="18.139.174.176", user="root",
                 password='yckcmkg', db="Reviews")


def add_review(asin, json):
    """
    Args:
        asin (string)
        json (dictionary)
    Returns:
        bool: True if suceeded false otherwise
    """
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
    print(reviews)
    print(values)
    cursor.execute(reviews, values)
    sql.commit()
    return True

# add_review("123456", {
#     "overall": 5,
#     "reviewText": "test",
#     "reviewerName": "John",
#     "reviewerID":"GHJKGMHHGFFGB",
#     "summary": "book was awesome",
# })
