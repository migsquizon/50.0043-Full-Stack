flintrock run-command --master-only databass_cluster \
	"
	python spark_tfidf.py &&\
	hadoop fs -get /checkpoint3/tfidf.csv &&\
	cat tfidf.csv/*.csv > tfidf_local.csv &&\
	head tfidf_local.csv &&\
	exit 1
	"