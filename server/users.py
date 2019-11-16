from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256

mongo = MongoClient("mongodb://18.139.174.176:27017",username = 'Admin',password = 'yckcmkg')

def get_user_details(username):
    cursor = mongo['Kindle']['user_data'].find({'username':username})
    if cursor.count() == 0:
        return None
    for x in cursor:
        return x

def add_user(json):
    # print(json['password'])
    json['password'] = pbkdf2_sha256.hash(json['password'])
    # print(json['password'])
    user_data_collection = mongo['Kindle']['user_data']
    x = user_data_collection.insert_one(json)
    return True


def verify_user_password(signin,database):
    if(pbkdf2_sha256.verify(signin,database)):
        return True
    return False



# print(get_user_details('miguel'))
# add_user({"username":'admin',"password":'imnotgoingrockafall'})

# x = mongo['Kindle']['user_data'].find({'username':'admin'})
# for user in x:
#     print(user)
#     passw = user['password']
# hashed = passw
# print(pbkdf2_sha256.verify('imnotgoingrockafall',hashed))