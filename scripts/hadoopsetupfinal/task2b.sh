flintrock run-command --master-only --ec2-identity-file $databass_path  --ec2-region ap-southeast-1 databass_cluster \
	"
	python spark_tfidf.py &&\
	hadoop fs -get /checkpoint3/tfidf.csv &&\
	cat tfidf.csv/*.csv > tfidf_local.csv &&\
	head tfidf_local.csv &&\
	exit 1
	"