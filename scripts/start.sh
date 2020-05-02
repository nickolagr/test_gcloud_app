#!/bin/bash
cd /home/ubuntu/www
sudo npm install
nohup node app.js &
sudo systemctl restart nginx
