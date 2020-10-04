# backend update
ProjectPath="/home/ec2-user/capstone-project-sunshine-waiter"
ServicePath="/home/ec2-user/capstone-project-sunshine-waiter/ops/sw-be.service"
ServiceName="sw-be"

cd $ProjectPath; git pull

export NODE_ENV=production

sudo cp ServicePath /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl restart $ServiceName
journalctl -u sw-be -n 20
# mongodb