#!/bin/bash
sudo apt-get update
sudo apt-get install mysql-server -y
sudo ufw enable 
sudo ufw allow ssh
sudo ufw allow mysql #allow sql firewall 
sudo systemctl start mysql
echo "server will now start on boot"
sudo systemctl enable mysql
sudo printf "\n[mysqld]\nbind-address = 0.0.0.0"  >> /etc/mysql/my.cnf #allow external connections
sudo mysql -e 'update mysql.user set plugin = "mysql_native_password" where user="root"'
sudo mysql -e 'create user "root"@"%" identified by ""'
sudo mysql -e 'grant all privileges on *.* to "root"@"%" with grant option'
sudo systemctl restart mysql