FROM nodered/node-red:latest

COPY ./config/settings.js /data/settings.js
RUN chmod 0600 /data/settings.js && \
  node-red admin hash-pw

VOLUME /data
