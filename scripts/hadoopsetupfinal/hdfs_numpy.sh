flintrock run-command --master-only databass_cluster \
	" hadoop fs -mkdir /checkpoint3 &&\
	yes | sudo yum install python27-numpy &&\
	yes | pip --no-cache-dir install pyspark --user &&\
	yes | sudo yum install python34-setuptools -y &&\
	yes | sudo easy_install-3.4 pip &&\
	pip3 install mysql-connector-python --user &&\
	pip3 install pymongo --user &&\
	pip3 install flask --user &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/hadoopsetupfinal/download.py &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/hadoopsetupfinal/pearson.py &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/hadoopsetupfinal/spark_tfidf.py &&\
	python3 download.py $1 $2 &&\
	hadoop fs -put etl_sql_reviews.csv /checkpoint3 &&\
	hadoop fs -put etl_mongo_metadata.json /checkpoint3 &&\
	python spark_tfidf.py
	"
	
