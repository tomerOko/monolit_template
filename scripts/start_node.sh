# it is important to write '/' befor the addres, in order to get to this *absolute* path
cd /app
# in case node_modules is damaged or deleted or not missing packages
npm i
# i aint sure it is neccesary but, pm2 have this thing that they don uses the PATH, or in other words there is always a need to write the full path of the binary file
# the two dash's between the path and the 'ser'
pm2 start npm -- run dev # the entrypoint, or the last command of the shell script representing the entry point - will be the main procces of the container, and the container will
# shut down in case this proccess is done. therefor we run another bash proccess at the end to keep the container up 
bash



    # "test": "echo \"Error: no test specified\" && exit 1",
    # "dev": "nodemon --watch './**/*.ts' --exec 'ts-node' /app/insex.ts",
    # "prod": "node index.js"