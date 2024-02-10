FROM eclipse-mosquitto:latest

COPY ./config/ /mosquitto/config/
RUN chmod 0600 /mosquitto/config/* && \
  mosquitto_passwd -U /mosquitto/config/passwd_file

VOLUME /mosquitto/config /mosquitto/data /mosquitto/log
