## database setup inside docker container -> 

- i have already setup mysql container let go -> 

```sh 

docker start ubuntu-mysql 

docker exec -it ubuntu-mysql bash 

## inside container ubuntu

mysqld --user=mysql & 

mysql 

```


## mysql permission database to user ->  

```sql

grant all privileges on fileStorage.* TO 'ubuntu_root'@'%';

grant all privileges on fileStorage.* TO 'root'@'localhost';

grant all privileges on fileStorage.* TO 'root'@'%';


```


```sql

GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'localhost';

```

## apply changes 

```sql

FLUSH PRIVILEGES;

```

- to remove permissions ->
```sql 

REVOKE ALL PRIVILEGES ON database_name.* FROM 'username'@'localhost';

```

- now lets create pool connection and check the connection with db 