flintrock run-command --master-only databass_cluster \
	"
	hadoop fs -get tfidf.csv &&\
	cat tfidf.csv/*.csv > tfidf_local.csv &&\
	head tfidf_local.csv"