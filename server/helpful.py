import mysql.connector as db
import time
from datetime import date
sql = db.connect(host="18.139.174.176", user="root",password='yckcmkg', db="Reviews")


@app.route('/reviews/helpful')
def helpful(review_id,isHelpful):
    try:
        review = reviews.get_review(review_id)
        helpful,nothelpful = reviews["helpful"]
        if (isHelpful == 1):
            helpful += 1
        if (isHelpful == 0 ):
            nothelpful += 1
    except Exception as e:
        return ("Excetion" :e),500

