flintrock run-command --master-only databass_cluster \
	"wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/kindle-reviews.zip -O kindle-reviews.zip &&\
	unzip kindle-reviews.zip &&\
	rm -rf kindle_reviews.json &&\
	wget -c https://istd50043.s3-ap-southeast-1.amazonaws.com/meta_kindle_store.zip -O meta_kindle_store.zip &&\
	unzip meta_kindle_store.zip &&\
	rm -rf *.zip &&\
	hadoop fs -mkdir /anything
	hadoop fs -put kindle_reviews.csv /anything &&\
	hadoop fs -put meta_Kindle_Store.json /anything &&\
	yes | sudo yum install python27-numpy &&\
	yes | pip --no-cache-dir install pyspark --user &&\
	yes | sudo yum install python34-setuptools -y &&\
	yes | sudo easy_install-3.4 pip &&\
	pip3 install mysql-connector-python --user &&\
	pip3 install pymongo --user &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/download.py
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/pearson.py
	pip3 install flask --user"
	
