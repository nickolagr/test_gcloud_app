#!/bin/bash
cd /home/ubuntu/www
sudo npm install
nohup node app.js &
# echo row - to close from STDOUT
echo "finished"
sudo systemctl restart nginx
