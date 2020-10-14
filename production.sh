#!/bin/bash

cd /home/odroid/projects/ai-ui-component &&
git pull  --no-edit
npm install &&
npm run build &&
echo $1 | sudo -S -k npm install -g build
pkill -f serve  &&
serve -s build &

