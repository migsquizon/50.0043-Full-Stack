import logging
import re
from log4mongo.handlers import MongoHandler
from pymongo import MongoClient
from app import app
import time
mongo_ip = app.config['MONGO_IP']
P_REQUEST_LOG = re.compile(r'^(.*?) - - \[(.*?)\] "(.*?)" (\d+) (\d+|-)$')

class MyFormatter(logging.Formatter):
    def format(self, record):
        match = P_REQUEST_LOG.match(record.msg)
        if match:
            ip, date, request_line, status_code, size = match.groups()
            return {'ip':ip,'date':date,'request':request_line,'status':status_code,'unixTime':time.time()}
        return {'record':record.msg}


def addLogger():
    handler = MongoHandler(host=mongo_ip)
    handler.setFormatter(MyFormatter())
    logger = logging.getLogger()
    logger.addHandler(handler)

def getLogs(num=25):
    mongo = MongoClient(f"mongodb://{mongo_ip}:27017")
    return mongo['logs']['logs'].find().sort([('_id',-1)]).limit(num)

# print(getLogs()[0])