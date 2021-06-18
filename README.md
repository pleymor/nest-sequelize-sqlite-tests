## Description

Sample project destined to illustrate how to create unit tests with NestJS and Sequelize on SQLite.

## Install then run tests

```bash
npm i
jest
```

Locally, the API is available at http://localhost:3001

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Locally build and push image

```shell
docker build -t dockeregistry.azurecr.io/chatbot-sopi-service-auth -t dockeregistry.azurecr.io/chatbot-sopi-service-auth:2021.04.26-1 .
```

```shell
docker push dockeregistry.azurecr.io/chatbot-sopi-service-auth -a
```

You can use docker-compose to test the image:

```shell
docker-compose up
```
