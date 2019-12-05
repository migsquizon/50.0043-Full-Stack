wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
echo "server will now start on boot"
sudo systemctl enable mongod
sudo systemctl restart mongod
echo "UFW enabled open port 27017"
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 27017
sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf
sudo systemctl restart mongod
sudo systemctl status mongod