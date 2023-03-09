## Установка и запуск внутри докера

---
В папке проекта выполните команду:  
`docker compose  -f "docker-compose.yml" up -d --build postgres pgadmin`  
Подождите пока контейнеры базы поднимутся

---
Как только контейнер запуститься, необходимо перейти в браузере по ссылке `http://localhost:28709/browser/`  

Зайдите в pgAdmin `test_backend`  
Учетные данные:  
* `login` — `admin@linuxhint.com`
* `password` — `secret`
<p align="left">
    <img src="./D0.png" />
</p>

---
Далее добавьте сервер базы (подключитесь к базе из pgAdmin)
Нажмите на:  
`Servers -> Register -> Server...`
<p align="left">
    <img src="./D1.png" />
</p>

Заполните основную информацию:  
(поле `name` любое на выбор)
<p align="left">
    <img src="./D2.png" />
</p>

Заполните информацию подключения:
* `Hostname/address` — `postgres`
* `Port` — `5432`
* `Maintenance database` — `test-project-gis`
* `Password` — `123456789`
<p align="left">
    <img src="./D3.png" />
</p>

---

Далее в папке проекта выполните команду:  
`docker compose  -f "docker-compose.yml" up -d --build gis-api`  

Подождите пока контейнер сервера поднимется.

Проверьте таблицу `Geozone` на наличие 
(после запуска сервера она должна автоматически создаться)  
`Databases -> test-project-gis -> Schemas -> public -> Tables`
<p align="left">
    <img src="./D4.png" />
</p>

---

Готово!!!
