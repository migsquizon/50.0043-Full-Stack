echo "The output value shows the DNS of our frontend app."
echo "please append port 3000 to the end of the dns output"
aws cloudformation describe-stacks --stack-name databass | grep PublicDNS -A 1