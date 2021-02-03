## Run Postgres Docker

```sh
docker run \
--name postgres \
-e POSTGRES_USER=jadiscke \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_DB=heroes \
-p 5432:5432 \
-d \
postgres
```

## See which images are runnig

```sh
docker ps
```

## Execute bash inside the container

```sh
docker exec -it postgres /bin/bash

```

## Execute adminer

```sh
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```

## Run MongoDB docker

```sh
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    -d \
    mongo:4
```

## Client MongoFB

```sh
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```

## Create User MongoDB

```sh
docker exec -it mongodb \
    mongo --host localhost -u admin -p password --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user:'jadiscke', pwd: 'password', roles: [{role: 'readWrite', db: 'herois'}]})"
```

## Padroes de Projeto --- Strategy
