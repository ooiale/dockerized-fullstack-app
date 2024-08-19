FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci  --omit=dev

USER node

ENV PORT=3000

EXPOSE 3000

CMD [ "npm" , "start" ]

# $ docker build -t fs-hello-world . 
# builds the docker, with the tag and the . says the dockerfile is on root
# $ docker run fs-hello-world