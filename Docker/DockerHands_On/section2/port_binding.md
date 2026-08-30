## Port binding in docker 

> *Docker me Port Binding (ya Port Mapping) ka matlab hota hai aapke Host Machine (aapka laptop/server) ke port ko Docker Container ke port se connect karna.Iske bina, aap container ke andar chal rahi application (jaise website ya database) ko bahar se access nahi kar sakte.*

## Core Concept (Ye kyu zaroori hai?)
> *Docker containers isolated (ek alag duniya me) hote hain. Agar container ke andar Nginx server port 80 par chal raha hai, toh aap use apne laptop ke browser me direct open nahi kar sakte. Port binding iske liye ek bridge (rasta) banati hai.*


## Syntax aur Use Case
- Port binding ke liye -p option ka use kiya jata hai:
```sh

docker run -p [Host_Port]:[Container_Port] image_name


## just a simple examples 
sudo docker run -p 3994:3306 mysql 

```

## Key Concepts
- Host Port: Aapke laptop/server ka port jahan se aap request bhejenge (e.g., 8080).

- Container Port: Container ke andar application jis port par listen kar rahi hai (e.g., 80).

- The Bridge: docker run -p 8080:80 nginx chalane par, jab aap browser me localhost:8080 kholenge, toh Docker use automatic container ke port 80 par bhej dega.

--- 


## Types of Port Binding 
- Specific Port Binding: -p 8080:80 (Aap khud port decide karte hain).
- Random Port Binding: -p 80 ya -P (Docker host machine ka koi bhi khali port automatic allot kar deta hai).
- IP Specific Binding: -p 127.0.0.1:8080:80 (Sirf local machine se access allow karne ke liye).

