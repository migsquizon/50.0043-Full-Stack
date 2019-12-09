#!/bin/bash
# curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash

# sudo apt-get install -y nodejs

# check versions
node --version
npm --version

cd ..

cd client

cd database-project-ui

npm install

nohup npm start > react_debug.txt &


