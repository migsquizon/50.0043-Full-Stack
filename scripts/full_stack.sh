#!/bin/bash
#ports
# sudo ufw enable

# sudo ufw allow 80

sudo apt-get update
# node
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash

sudo apt-get install -y nodejs

# node --version

# npm --version

# python


sudo apt-get install python3-pip

pip3 --version

export LC_ALL=C

pip3 install -r requirements.txt

#backend
source ./backend.sh &

#frontend
source ./frontend.sh &


exit 0