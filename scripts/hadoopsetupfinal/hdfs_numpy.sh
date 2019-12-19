flintrock run-command --master-only databass_cluster \
	" hadoop fs -mkdir /checkpoint3 &&\
	yes | sudo yum install python27-numpy &&\
	yes | pip --no-cache-dir install pyspark --user &&\
	yes | sudo yum install python34-setuptools -y &&\
	yes | sudo easy_install-3.4 pip &&\
	pip3 install mysql-connector-python --user &&\
	pip3 install pymongo --user &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/etf/pearson.py &&\
	wget https://github.com/migsquizon/50.0043-Full-Stack/raw/automation/scripts/etf/download.py &&\
	python3 download.py $1 $2 &&\
	
	pip3 install flask --user"
	
