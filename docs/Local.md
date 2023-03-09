## Установка и запуск без докера

---
Откройте `env` файл в проекте и замените значения следующих полей на свои:

* `POSTGRES_HOST` — `127.0.0.1` или свои значения
* `POSTGRES_PORT` — `5432` или свои значения
* `POSTGRES_USER` — свои значения
* `POSTGRES_PASSWORD` — свои значения

---
Откройте pgAdmin и откройте окно создания базы данных  
`Databases -> Create -> Database...`
<p align="left">
    <img src="./C1.png" />
</p>

Назовите базу `test-project-gis`
<p align="left">
    <img src="./C2.png" />
</p>

---
Далее зайдите в меню расширений
`Extensions -> Create -> Extension...`
<p align="left">
    <img src="./C3.png" />
</p>

Выберите расширение `postgis`
(поле `name` любое на выбор)
<p align="left">
    <img src="./C4.png" />
</p>

---

Далее в папке проекта выполните команду:  
`npm run start:dev`  

---

Готово!!!
