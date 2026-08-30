# how i setup my mysql in ubuntu docker container 

## without volume 
```sh 


docker run -it --name youcontainername  ubuntu_image_name(its just ->  ubuntu  )

docker start containername  

docker exec -it containername bash

## now your are in the container lets setup mysql 

>  apt update 

> apt install mysql-server -y 

> mysql 

## if it's not start then ese setup krna hoga 

> mysqladmin 

> mysqladmin ping 

# ager alive lihka a raha hai to its ok done 
## ager nhi let gooo 

> mkdir -p /var/run/mysqld
> chown -R mysql:mysql /var/run/mysqld
> chmod 744 /var/run/mysqld

> mysqladmin ping 

> mysql 

## ager abhi bhi nhi chla lets do 

## hame sql service ko start krna hoga jo ki docker containers mien ham systemctl yan service ka use nhi kr skt in my case 
>  service mysql start 
>  service mysql status 

## ager yeh ho raha hai to 

> mysqld --user=mysql &  # service mysql start chalane ki zaroorat nahi hai. Seedha MySQL daemon (mysqld) ko background process (&) ki tarah start karein:

> mysqladmin ping 
> mysql  


#  ok ??? ?

```

## how to create new user in mysql 

```sql 

## check for current user

select user(); 


select user host from mysql.user;


CREATE USER 'username'@'localhost' IDENTIFIED BY 'your_password'; 

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;

/* or on specific */

create database yourdbname;

GRANT ALL PRIVILEGES ON my_app_db.* TO 'username'@'localhost';


FLUSH PRIVILEGES;


```

```sql 

/*  login process ->  */
mysql -u username -p 
enter your password: *******


mysql -u root -p 
/* if you set root password  */

```


# with docker volume 
## 🔥 Tarika 1: Existing Ubuntu Container ko Volume ke sath Restart Kaise Karein (Commit Method)
Agar aapne us Ubuntu container ke andar pehle se kuch kaam kiya hua hai aur aap use khona nahi chahte, toh aap yeh steps follow karein:

Step 1: Apne chalte hue container ka ek "Image" bana leinPehle apne container ka ek snapshot (image) bacha lijiye taaki aapka kaam safe rahe.

```sh 


docker commit <existing_container_id_or_name> my-ubuntu-mysql-imagenanme

```

Step 2: Purane container ko stop aur remove kareinKyunki hum same naam ya port use karenge, isliye purane ko stop karna hoga:


```bash

docker stop <existing_container_id_or_name>
docker rm <existing_container_id_or_name>

```

---

Step 3: Naya container start karein -v (Volume) ke sath
Ab hum aapki banayi hui image se naya container chalayenge aur isme -v lagayenge taaki MySQL ka data aapke computer (host) par save ho:

```sh
docker run -it -d --name my-ubuntu-mysql -v ubuntu_mysql_data:/var/lib/mysql my-ubuntu-mysql-image


## Note down its very important ! jo bhi hame -v k bad pass krna hai vo absolute path hoga us foler ka jo hamare container k liye volume k hoga ek storage  so make sure vo foler pahle create kro then uska proper path yahan set krna 

docker run -it -d --name ubuntu-mysql -v /home/Coder_x/container-data/ubuntu_mysql_data:/var/lib/mysql my-ubuntu-mysql-image


```
-v ubuntu_mysql_data:/var/lib/mysql: Yeh line aapke Ubuntu container ke andar jo MySQL ka data folder (/var/lib/mysql) hoga, use aapki hard disk ke ubuntu_mysql_data volume se jod degi. Ab container delete bhi ho jaye, data safe rahega.


--- 
## Shortcut (Agar aapko container delete hi nahi karna):
Agar aap risk nahi lena chahte aur purane container ko delete nahi karna chahte, toh aap use waise hi chalta rehne dein.Aap bas naya container alag naam se bana lein:

```sh

docker run -it -d --name my-new-container-v2 -v ubuntu_mysql_data:/var/lib/mysql my-saved-ubuntu-work


```
Isse aapka purana container bhi zinda rahega aur naye wale mein aapka kaam aur volume dono aa jayenge.

---
*** 


## 🛠️ Tarika 2: Ubuntu Container ke andar MySQL setup karne ka sahi tarika (Fresh Start)

Agar aapko lagta hai ki purane Ubuntu container mein kuch khaas data nahi tha aur aap fresh setup kar sakte hain, toh direct yeh command chalayein:

```sh 


docker run -it -d --name new-ubuntu-box -v /home/Coder_x/container-data:/var/lib/mysql ubuntu:latest

```

## 📥 Container ke andar MySQL kaise setup karein?
Jab aap upar diye gaye dono tarikon mein se kisi ek se container start karlein, toh uske andar MySQL setup karne ke liye yeh steps follow karein:

1) Container ke andar enter karein:

```sh 

docker exec -it <container_name> bash

```

2) Ubuntu repositories ko update karein

```sh 

apt update

```

3 ) MySQL Server install karein: 

``` sh 

apt install mysql-server -y
 

### MySQL Service start karein:Kyunki yeh Ubuntu container hai (jisme systemd nahi hota), isliye service start karne ke liye yeh command chalayein:
service mysql start

mysql -u root

```
- *ager yah kam na kre to jo hamne sql setup commands uppar likhi hai use kro*

---- 

**** 




