# NODE DEV IMAGE:

#a basic image to start from
FROM node:17-alpine3.14

# best practie is to update apk before instalations
RUN apk update

# install bash
RUN apk add --no-cache --upgrade bash 

# install git
RUN apk add git

RUN apk add openssh-client

# needed global packages for the project
RUN npm i -g typescript nodemon ts-node

# make the binaries of the globaly installed packages avilable in the cli
ENV PATH=/usr/local/bin:/app/node_modules/.bin:$PATH

# defines where to run the 'ENTRYPOINT' command from
WORKDIR /app

# set the default main command of the container to run 'nodemon src/index.ts'
ENTRYPOINT ["/bin/bash" , "-c" ]
CMD ["bash" ]

