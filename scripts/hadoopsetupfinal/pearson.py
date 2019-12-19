
from pyspark.sql import SparkSession
from pyspark.sql import functions as f
import re
import os
import math
#os.environ["PYSPARK_PYTHON"]="/usr/bin/python3"
print("hello")
sc = SparkSession.builder.master("local").appName("pearson").getOrCreate()
reviews=sc.read.options(header=True).csv("hdfs:///checkpoint3/etl_sql_reviews.csv")
reviews.show()
price = sc.read.json("hdfs:///checkpoint3/etl_mongo_metadata.json")
price.show()
print(type(price))
from operator import add
reviews = reviews.withColumn('reviewText', f.size(f.split(f.col('reviewText'), ' ')))
#print(df.show())
print(type(reviews.reviewText))
from pyspark.sql.types import IntegerType
reviews = reviews.withColumn("reviewText", reviews["reviewText"].cast(IntegerType()))
#reviews.show()
grouped = reviews.groupBy('asin').agg({'reviewText':'mean'})
grouped.show()
#prices = price.groupby().sum()
#prices.show()
new = grouped.join(price, grouped.asin == price.asin).select(grouped["*"],price["price"])
#new = new.where(f.length(new.select('asin'))<30)
new = new.dropna()
new.show(20)
prices = new.groupby().sum()
prices.show()
data = new.select("price",'avg(reviewText)')
print("hi")
print(data)
count = data.count()
#print(data.select('price').sum())
#data = data.where(f.size(data['asin'])< 30)
data= data.rdd
print(data.first())
#data.show()
print("map to list")

flatdata = data.flatMap(lambda x: (
    ('x',x[0]),
    ('y',x[1]),
    ("x2",x[0]*x[0]),
    ('y2',x[1]*x[1]),
    ( "xy",x[0]*x[1])))
print("flatmap done")
#print(flatdata)
#print(flatdata.collect())
print(flatdata.take(5))
reducer = flatdata.reduceByKey(lambda x,y:x+y).sortByKey()
print("reducer done")
#print(reducer[0])
out = reducer.take(5)
print(out)
print(out[0])
print(out[0][1])
y2 = out[4][1]
x2 = out[1][1]
xy = out[2][1]
y = out[3][1]
x = out[0][1]
print("x is {} , y {} ,xy is {} ,y2 is {} ,x2 is {} ".format(x,y,xy,y2,x2))
print(count)
num = xy*count - (x*y)
denom = math.sqrt(count*x2-(x*x)) * math.sqrt(count*y2-(y*y))
pearson = num/denom
print( pearson )


