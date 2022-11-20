# hey! welcome to align test

## description
mini user management app using react node:ts and mongo

## security
not secured at all
DO NOT DEPLOY TO ANY SERVER/CLOUD BEFORE HIDING CONFIG FILES AND CHANGING + HIDING PASSWORDS


## installation
make sure u have docker running

## runing
basicaly, if you can run sh file, and habe docker runing, just run 'sudo sh build_verbose.sh'
more spesificaly
1. clone/download to linux/mac machine or WSL if u are on windows
2. cd into this project
3. run: 
        * 'sudo sh build_verbose' - to see whats going on
        * 'sudo sh start_all' or 'sudo docker-compose up' -to just bring it all up
        * 'sudo sh start_verbose_no_cache' - to see every stage of the image build

## ports:
1. react app will be runing at localhot:4200
2. node server runing on localhost:3000
3. mongo deamon ruming on localhost:3306

## for development
1. open vscode (from linux or WSL) 
2. click Ctrl+shift+p
3. copy and paste: remote-containers: attach to running container
4. choose 'react_frontend'
5. do 3 again 
6. this time choose 'node_backend'
7. to see the main proccess node_backend or react_frontend just run the conmand 'pm2 logs 0'
8. if there any git problems try runing 'sudo chown -R $USER:$(id -gn $USER) ./*' and then then yout linux password
9. if u want to connect to the mysql with some GUI (like workbench) the password for root is on the docker file


## developing notes
* if installing anything globaly and u want it to stay for the next build, please add the installation to the Dockerfile at the end of the 'RUN npm i -g' line 
* install react extension on chrome
* install robo-3t or any other mongodb client in oreder to comunicate with the dimon


