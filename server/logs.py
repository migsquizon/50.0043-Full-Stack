from pymongo import MongoClient
from pymongo import ASCENDING
import datetime
from pythonjsonlogger import jsonlogger
import logging
import logging.handlers
import pymongo
import json
from handlers import MongoHandler

client = MongoClient("mongodb://18.140.90.36:27017",username = 'Admin',password = 'yckcmkg')
'''db = client.Kindle
log_collection = db.logs
log_collection.ensure_index([("timestamp", ASCENDING)])  '''



formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(threadName)s: %(message)s')

handler = MongoHandler(host='18.140.90.36')
logger=logging.getLogger()
logger.addHandler(handler)


'''log = logging.getLogger()
log.setLevel(logging.DEBUG)
fh = logging.handlers.RotatingFileHandler(
              filename='test.log', maxBytes=2097152, backupCount=5)
fh.setFormatter(formatter)
log.addHandler(fh)'''

'''#read file

with open('test.log', 'r') as myfile:
	data=myfile.read()

data=[]
with open('test.log') as f:
	for line in f:
		data.append(json.loads(line))



def log(msg):
    entry = {}
    entry['timestamp'] = datetime.datetime.utcnow()
    entry['msg'] = msg
    log_collection.insert(entry)

log(data)'''
