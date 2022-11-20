# it is important to write '/' befor the addres, in order to get to this *absolute* path
cd /app

# in case node_modules is damaged or deleted or not missing packages
npm i

# --interpreter bash => i dont know what the hell it means, stack overflow does. about the two dashes before the 'start' => it seperate the attributes of pm2 and the attribute of the command its running
pm2 start yarn --interpreter bash -- start

# for documentations, but, you still have to run 'npm docs' in order to update the aoutomaticaly 
# pm2 start http-server -- /documentation -p 4205 -a 0.0.0.0

# the entrypoint, or the last command of the shell script representing the entry point - will be the main procces of the container, and the container will
# shut down in case this proccess is done. therefor we run another bash proccess at the end to keep the container up 
bash
