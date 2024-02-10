# mystack docker


## Створюємо та запускаємо контейнери

Клонуємо репозиторій, переходимо в папку з docker-compose.yml та створюємо іміджі контейнерів:

```bash
cd .. && sudo rm -r mystack/
cd ~ && git clone https://github.com/dialmak/mystack.git && cd mystack && docker compose build
```

Запускаємо  контейнери у фоновому режимі:

```bash
docker compose up -d
```


##  Додаємо користувачів до mosquitto

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