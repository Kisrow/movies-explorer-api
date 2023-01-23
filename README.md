# movies-explorer-api
Server part for the project.
## Realized:
* routes without auth protection : /signup, /signin
* routes with auth protection : /users, /movies

## Used:
* Cors
* Helmet
* Rate limiter
* Validate
* Loggers
* Eslint
* Joi, celebrate

## For the reviewer
  Может возникнуть проблема с ограничением кол-ва запросов в ед. времени (10 в минуту). Изменить можно в constants LIMITER_MAX_REQUESTS

### Project layout https://www.figma.com/file/UnfCNSq8JKslUCFL1z1PK0/Diploma-(Copy)?node-id=891%3A3857&t=q4b71S3LJyFhU2Ib-1
