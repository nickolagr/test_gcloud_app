#!/bin/bash
cd /home/ubuntu/www
sudo npm install
nohup node app.js &
echo "finished"
sudo systemctl restart nginx
