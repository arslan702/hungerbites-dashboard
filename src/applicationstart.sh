#!/bin/bash

cd /home/ubuntu/admin

export PATH="$PATH:/usr/lib/node_modules/pm2/bin"

pm2 describe "frontend-admin"
if [ $? -eq 0 ]
then
    pm2 restart "frontend-admin"
else
    pm2 start npm --name "frontend-admin" -- start
fi
pm2 startup systemd
pm2 save


