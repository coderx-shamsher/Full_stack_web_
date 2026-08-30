## Docker Compose 
> *Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to configure your entire application stack—including services, networks, and volumes—in a single YAML configuration file. With just one command, you can spin up or tear down all the containers needed for your application.Rather than manually running multiple, long docker run commands for individual components (like a web app, a database, and a cache), Docker Compose automates the entire orchestration process locally*


```sh 


sudo docker run -d -p3369:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PA
SSWORD=admin  --network DevelopmentDb mongo


``` 

- yeh long command ham ek compose.yaml file mein write krenge  for better development exp 

---

```sh 

docker compose -f filename.yaml up -d   ## for running 

docker compose -f filename.yaml down   ## for stop runing and removing all the containers 

```

