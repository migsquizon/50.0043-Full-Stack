from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256

mongo = MongoClient("mongodb://18.140.90.36:27017",username = 'Admin',password = 'yckcmkg')

def get_user_details(username):
    cursor = mongo['Kindle']['user_data'].find({'username':username},{'_id':0})
    if cursor.count() == 0:
        return None
    for x in cursor:
        return x


def add_user(json):
    # print(json['password'])
    json['password'] = pbkdf2_sha256.hash(json['password'])
    # print(json['password'])
    if "username" not in json or "password" not in json or "first_name" not in json or "last_name" not in json:
        raise KeyError("Missing required credentials for signup")

    if not (json["username"] and json["password"] and json["first_name"] and json["last_name"] ):
        raise KeyError("Missing required credentials for signup : FIELD IS EMPTY")

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