read -p "enter your instance type: " InstanceType
read -p "enter your ec2 ssh key name: " KeyName
# might use same key name as flintrock
#spark ip not used for now
aws cloudformation create-stack  --stack-name databass  \
    --template-body file://database.json \
    --parameters  ParameterKey=KeyName,ParameterValue=$KeyName ParameterKey=InstanceType,ParameterValue=$InstanceType ParameterKey=SparkIP,ParameterValue=123123
echo "this may take some time"
