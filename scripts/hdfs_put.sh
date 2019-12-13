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
	sudo yum install python34-setuptools -y &&\
	sudo easy_install-3.4 pip &&\
	pip3 install flask --user &&\
	pip --no-cache-dir install pyspark --user"
	
