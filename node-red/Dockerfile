FROM nodered/node-red:latest

COPY ./config/settings.js /data/settings.js
RUN node-red admin hash-pw

VOLUME /data
