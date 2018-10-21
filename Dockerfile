FROM node:8.12.0-slim

USER root

RUN npm install -g nodemon \
    && npm cache clean --force

USER node

VOLUME /home/node/project

WORKDIR /home/node/project

CMD nodemon index.js