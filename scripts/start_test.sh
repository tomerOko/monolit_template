sudo chown -R $USER:$(id -gn $USER) ./* # this give permission to windows to eddit the content of the folder this script runing from, so it lets vscode edit the content of this folder
sudo docker-compose down
sudo docker-compose --env-file ./compose.test.env up -d
docker exec -it backend.container bash

