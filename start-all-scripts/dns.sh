echo "DNS of our front end web app"
aws cloudformation describe-stacks --stack-name databass\
| grep PublicDNS -A 1 | tail -n 1| awk -F'"' '{printf "http://"}{printf $4}{print ":3000"}'