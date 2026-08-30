# Section 2 in Docker 

> **Versions in Images** -> jo bhi version hoga use image ka jo ham pull kr rahe hain vo tags hai in docker terms 

```sh 

sudo docker pull kalilinux/kali-rolling

## yeh by defualt latest tag pull krta hai but its not means latest sometimes 

```

- NOTE -> *ager hamne same he image k differ versions ko pull kiya hai to hame already exists etc dekhne ko milta hai example ager maine mysql ko pull kiya hai to next ager main mysql:8.0 ko pull krta hun to kuch layers pahle he pull hogyi hai to us case mein already exists show hota hai.*


## Some docker commands 

**1) -d option with docker**

> *Docker me -d option ka matlab Detached Mode hota hai. Iska use container ko background me chalane ke liye kiya jata hai.*

##  Key Points:
- Background Run: Container piche chupchaap chalta rehta hai.
- Terminal Free: Aapka terminal screen block nahi hota. Aap dusre commands run kar sakte hain.
- Output: Ye screen par logs dikhane ke bajaye sirf container ki ID return karta hai.
- Default: Agar -d nahi lagaoge, toh container Foreground me chalega aur aapka terminal lock ho jayega.

```sh 

sudo docker run -d ImageName 

```


**2) --name with docker**

> **this command for give our container a name, yeh hamara custom name hota hai**

```zsh 

sudo docker run --name mycontainer1 imageName

```

**3) -e with docker**

> **environment variables - using this -e option we can set env variables in our docker container yeh ham db servers etc main mostly krte hain if you deal with mysql or other**

```sh 

sudo docker --name mysqlserver1  -e MYSQL_USER=adminx -e MYSQL_PASSWORD=adminx ImageName


```

