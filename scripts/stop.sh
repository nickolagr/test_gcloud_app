#!/bin/bash
sudo systemctl stop nginx
cd /home/ubuntu
if sudo [ -d "www" ]; then sudo rm -Rf www; fi