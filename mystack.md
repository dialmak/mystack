# mystack docker
| db            |           |          |
| ------------- | --------- | -------- |
| adminer:8080  |           |          |
| mqtt:1883     | mqtt:9001 |          |
| mqttx         |           |          |
| node          |           |          |
| influxdb:8086 |           |          |
| telegraf      |           |          |
| grafana:3000  |           |          |
| nodered:1880  |           |          |
| proxy:80      | proxy:443 | proxy:81 |


## Створюємо та запускаємо контейнери

Клонуємо репозиторій, переходимо в папку з docker-compose.yml, будуємо іміджі контейнерів та запускаємо контейнери у фоновому режимі:

```bash
# Видаляємо старі дані, якщо вони існують
cd ~ && sudo rm -r mystack/
# Клонуємо репозиторій
clear && git clone https://github.com/dialmak/mystack.git
# Будуємо іміджі в докері
cd mystack && docker compose build
# Запускаємо контейнери у фоновому режимі
docker compose up -d
```


##  Додаємо користувачів до mosquitto

Заходимо в контейнер mosquitto
```bash
# Заходимо в контейнер mosquitto
docker exec -it -u 1883 my-mosquitto sh
# Якщо ви хочете додати більше користувачів до файлу паролів, скористайтеся командою
mosquitto_passwd -b /mosquitto/config/passwd_file user_name user_password
# Змінюємо права на файл тільки для власника, інші не мають права читати цей файл
chmod 0700 /mosquitto/config/passwd_file
```

Тепер виходимо із контейнера за допомогою команди `exit` і перезапускаємо його за допомогою 

```bash
docker restart mqtt
```

Після цього ваші зміни будуть застосовані до брокера.

## MQTTX клієнт

Команди тут [https://mqttx.app/docs/cli/get-started](https://mqttx.app/docs/cli/get-started)

```bash
# Вбудовані сценарії 
mqttx ls -sc
# Підключення до серверу та підписка на все
mqttx sub -v -i 'mqttx_test' -t '#'-h 'mqtt' -p 1883 -u 'mqttx' -P 'osa00NET'
# Приклад запуску скрипта симуляції
mqttx simulate -v -i 'mqttx_%i' -t 'test/%c' -sc 'IEM'  -h 'mqtt' -p 1883 -u 'mqttx' -P 'osa00NET'
```

# InfluxDBv2_Telegraf_Docker
 Run InfluxDB 2.1 and Telegraf 1.22 in containers

 To learn more please read this blog on [Running InfluxDB 2.0 and Telegraf Using Docker](https://www.influxdata.com/blog/running-influxdb-2-0-and-telegraf-using-docker/)