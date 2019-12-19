from pyspark.sql import SparkSession
from pyspark.sql import functions as f
import re
import os
from pyspark.ml.feature import HashingTF, IDF, Tokenizer, CountVectorizer
os.environ["PYSPARK_PYTHON"]="/usr/bin/python"
sc = SparkSession.builder.master("local[*]").appName('tfidf').getOrCreate()
reviews=sc.read.options(header=True).csv("/checkpoint3/etl_sql_reviews.csv")
reviews = reviews.na.fill({'reviewText': ''})
tokenizer = Tokenizer(inputCol="reviewText", outputCol="words")
wordsData = tokenizer.transform(reviews)
cv = CountVectorizer(inputCol="words", outputCol="rawFeatures")
model = cv.fit(wordsData)
featurizedData = model.transform(wordsData)
idf = IDF(inputCol="rawFeatures", outputCol="features")
idfModel = idf.fit(featurizedData)
rescaledData = idfModel.transform(featurizedData)

#scores
rescaledData.select("features").show()


###trying to display nicely
vocab = model.vocabulary

def extract_values_from_vector(vector):
	return {vocab[i]: float(tfidf) for (i, tfidf) in zip(vector.indices, vector.values)}

def stringify(vector):
	words = ""
	for (i, tfidf) in zip(vector.indices, vector.values):
		temp = vocab[i]+":"+str(float(tfidf))+", "
		words+=temp
	return words[:-2]

attempt = rescaledData.select('reviewerID','asin','features').rdd.map(lambda row: [row[0],row[1],stringify(row[2])])
df = sc.createDataFrame(attempt, ['reviewerID','asin', 'tfidf'])
df = df.where(f.length(f.col("reviewerID")) < 20)
df.write.csv('/checkpoint3/tfidf.csv')
sc.stop()
