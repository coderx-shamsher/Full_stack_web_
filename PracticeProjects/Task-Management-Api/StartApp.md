## how to start app 

1) start backend server docker container -> 

```sh 

docker start containername (my containername backend1)

## go into interactive mode 
docker exec -it backend1 bash 

```

2) start db server container 

```sh 

docker start  ubuntu-mysql 


docker exec -it ubuntu-mysql bash 

```


3) *now test the app with postman on  whatever the port -> /api/health  -> this is the first endpoint to test app is ok ?*

----- 
