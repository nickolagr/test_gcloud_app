cd ~/www
sudo npm install
sleep 1m
nohup node app.js &
sudo systemctl restart nginx
