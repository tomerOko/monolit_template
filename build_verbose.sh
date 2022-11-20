sudo chown -R $USER:$(id -gn $USER) ./*
sudo docker-compose down
sudo docker-compose build --progress=plain
sudo docker-compose up -d
docker-compose logs
docker exec -it node_backend.container bash
echo $HALLOW
bash