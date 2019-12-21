flintrock run-command --master-only --ec2-identity-file $databass_path  --ec2-region ap-southeast-1 databass_cluster \
	"python pearson.py &&\
	exit 1
	"