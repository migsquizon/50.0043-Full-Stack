#!/bin/bash
#ports
# sudo ufw enable

# sudo ufw allow 80

# sudo apt update
# node
curl -sL https://deb.nodesource.com/setup_13.x > node.sh

EXIT_STATUS=1
while [ "$EXIT_STATUS" -ne "0" ]
do
    sudo bash node.sh
    EXIT_STATUS=$?
done

EXIT_STATUS=1
while [ "$EXIT_STATUS" -ne "0" ]
do
    sudo apt install -y nodejs
    EXIT_STATUS=$?
done

# node --version

# npm --version

# python
EXIT_STATUS=1
while [ "$EXIT_STATUS" -ne "0" ]
do
    sudo apt install python3-pip
    EXIT_STATUS=$?
done


pip3 --version

export LC_ALL=C

EXIT_STATUS=1
while [ "$EXIT_STATUS" -ne "0" ]
do
    pip3 install -r requirements.txt
    EXIT_STATUS=$?
done


#backend
source ./backend.sh &

#frontend
source ./frontend.sh &


exit 0