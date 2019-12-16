
from pyspark.sql import SparkSession
from pyspark.sql import functions as f
import re
import os
import math
#os.environ["PYSPARK_PYTHON"]="/usr/bin/python3"
print("hello")
sc = SparkSession.builder.master("local").appName("pearson").getOrCreate()
reviews=sc.read.options(header=True).csv("hdfs:///test/fresh.csv")
print("queried reviews")
print(reviews.count(),len(reviews.columns))
#reviews.show()
price = sc.read.json("hdfs:///test/freshdatanew.json")
#price.show()
print("queried prices")
print(price.count(),len(reviews.columns))

og_price = sc.read.json("hdfs:///anything/meta_Kindle_Store.json")
print("og price")
print(og_price.count(), len(reviews.columns))
og_rev = sc.read.options(header=True).csv("hdfs:///anything/kindle_reviews.csv")
print("og rev")
print(og_rev.count(),len(reviews.columns))


