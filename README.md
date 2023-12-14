## Перед запуском

Перед запуском важно заполнить конфиг (.development.env)
P.S. можно использовать поля из example.env

## Загрузка зависимостей

```bash
$ npm install
```

## Запуск приложения

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Важные моменты

В ТЗ у таблиц с полями id и score стоит тип данных - integer. В примере ответа иногда этот тип соответствует string. Для решения конфликта я сделал везде тип данных integer.

Также добавил уникальность оценки ученика в рамках одного урока.
