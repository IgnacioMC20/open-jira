# Nest.js Openjira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d significa __detached__

MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```
## Configurar las variables de entorno
Renombrear el archibo __.env.template__ a __.env__

## Llenar la base de datos con la informacion de pruebas

llamar a: 
```
http://localhost:3000/api/seed
```