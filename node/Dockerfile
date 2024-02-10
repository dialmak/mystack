#FROM node:latest
FROM node:slim

RUN mkdir -p /usr/node/node_modules && chown -R node:node /usr/node
WORKDIR /usr/node

USER node

RUN npm install mysql && npm install mqtt --save

COPY --chown=node:node ./node .

CMD [ "node", "mysqlitto.js" ]
