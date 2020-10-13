cd /home/odroid/projects/ai-ui-component &&
git pull && 
npm run build &&
echo $1 | sudo -S -k npm install -g build &&
serve -s build &

