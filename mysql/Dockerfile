FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=osa00NET
ENV TZ=Europe/Kyiv

COPY ./sql/ /docker-entrypoint-initdb.d/

VOLUME /var/lib/mysql

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
