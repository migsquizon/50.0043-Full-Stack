#ports
# sudo ufw enable

# sudo ufw allow 80


# node
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash

sudo apt-get install -y nodejs

# node --version

# npm --version

# python
sudo apt-get update

sudo apt install python3-pip

pip3 --version

export LC_ALL=C

pip3 install -r requirements.txt

#backend
sh backend.sh &

#frontend
sh frontend.sh &


exit 0