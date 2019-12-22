#pip3 install flintrock

read -p "Enter number of slaves: " NUM
read -p "Enter instance type: " TYPE
read -p "Enter key name: " KEY

flintrock --debug launch databass_cluster \
    --num-slaves $NUM \
    --spark-version 2.4.4 \
    --hdfs-version 2.7.7 \
    --ec2-key-name $KEY \
    --ec2-identity-file $databass_path \
    --ec2-ami ami-05c859630889c79c8 \
    --ec2-user ec2-user \
    --ec2-instance-type $TYPE\
    --ec2-region ap-southeast-1\
    --install-hdfs\
    --install-spark

#flintrock login databass_cluster



