#!/bin/bash
sudo systemctl stop nginx
cd /home/ubuntu
# check if folder exists and remove it if so
if sudo [ -d "www" ]; then sudo rm -Rf www; fi
