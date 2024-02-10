# mystack docker


## Структура каталогів

```bash
├── docker-compose.yml
├── mqtt
│   ├── config
│   │   ├── mosquitto.conf
│   │   └── passwd_file
│   └── Dockerfile
├── mysql
│   ├── Dockerfile
│   └── sql
│       └── init.sql
├── node
│   ├── Dockerfile
│   └── node
│       └── mysqlitto.js
├── node-red
│   └── data
├── stack.env
└── telegraf
    └── telegraf.conf
```

## Запуск

Клонуємо репозитарій

```bash
git clone https://github.com/dialmak/mystack.git
```

Переходимо в папку з docker-compose.yml
```bash
cd mystack
```
Створити іміджі контейнерів:

```bash
docker compose build
```
Запустити контейнери у фоновому режимі:

```bash
docker compose up -d
```


##  Додавання користувачів до mosquitto

Заходимо в контейнер mosquitto
```bash
docker exec -it -u 1883 my-mosquitto sh
```

Якщо ви хочете додати більше користувачів до файлу паролів, скористайтеся командою 

```bash
mosquitto_passwd -b /mosquitto/config/passwd_file user_name user_password
```

Змінюємо права на файл тільки для власника, інші не мають права читати цей файл
```bash
chmod 0700 /mosquitto/config/passwd_file
```

Тепер вийдіть із контейнера за допомогою команди `exit` і перезапустіть його за допомогою 

```bash
docker restart mqtt
```

Після цього ваші зміни будуть застосовані до брокера.