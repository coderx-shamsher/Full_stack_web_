# Docker Network — Complete Guide

Agar tum Docker properly seekh rahe ho, to **Docker Network bahut important concept** hai, especially jab tum multiple containers use karte ho — jaise:

```text
Frontend → Backend → Database
```

Normally containers isolated hote hain. **Docker Network containers ko ek doosre se communicate karne ka controlled way provide karta hai.**

---

# 1. What is Docker Network?

## Technical Explanation

A **Docker network** is a virtual network created and managed by Docker that allows containers to communicate with:

* Other containers
* The host machine
* External networks/Internet

Docker networking provides things like:

* Container-to-container communication
* Network isolation
* DNS-based service discovery
* Port publishing
* Network segmentation

Example:

```text
                 Docker Network
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
   Frontend        Backend        MySQL
   Container       Container      Container
```

The containers can communicate with each other through the Docker network.

---

## Hinglish Explanation

Simple language mein:

**Docker Network = containers ke beech communication ka raasta.**

Suppose tumhare paas:

```text
Frontend Container
Backend Container
Database Container
```

Frontend ko backend se baat karni hai:

```text
Frontend → Backend
```

Backend ko database se baat karni hai:

```text
Backend → MySQL
```

Ye communication Docker Network ke through hoti hai.

---

# 2. Why Do We Need Docker Network?

Suppose tumhare paas ye application hai:

```text
React/Next.js
      ↓
Node.js/Express
      ↓
MySQL
```

Aur teeno Docker containers mein run kar rahe hain:

```text
┌─────────────┐
│  Frontend   │
│  Container  │
└──────┬──────┘
       ↓
┌─────────────┐
│   Backend   │
│  Container  │
└──────┬──────┘
       ↓
┌─────────────┐
│    MySQL    │
│  Container  │
└─────────────┘
```

In containers ko communicate karwana hai.

Docker Network ye connection provide karta hai.

### Hinglish

Aise samjho:

> **Docker containers = alag-alag rooms**

> **Docker Network = un rooms ke beech connection**

Network nahi hoga to containers ke beech communication manage karna difficult ho jayega.

---

# 3. Docker Network Create Kaise Karein?

Sabse basic command:

```bash
docker network create mynetwork
```

Check karo:

```bash
docker network ls
```

Tumhe kuch aisa dikhega:

```text
NETWORK ID     NAME        DRIVER
abc123         bridge      bridge
xyz456         mynetwork   bridge
```

---

# 4. Container Ko Network Se Connect Karna

Example:

```bash
docker run -d --name backend --network mynetwork node
```

Another container:

```bash
docker run -d --name database --network mynetwork mysql
```

Ab:

```text
backend
   ↓
mynetwork
   ↓
database
```

Dono same network mein hain.

---

# 5. Most Important Concept: Container Name as Hostname

Ye Docker networking ka **bahut important concept** hai.

Suppose:

```bash
docker run -d --name backend --network mynetwork backend-image
```

and:

```bash
docker run -d --name mysql --network mynetwork mysql
```

Backend container se database ko access karte waqt generally:

```text
mysql
```

hostname use kar sakte ho.

For example Node.js:

```javascript
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password",
    database: "mydb"
});
```

### ❌ Don't do this

```javascript
host: "localhost"
```

### ✅ Use

```javascript
host: "mysql"
```

### Why?

Because Docker's user-defined networks provide **automatic DNS/service discovery**.

Docker knows:

```text
mysql → MySQL container
backend → Backend container
```

---

# 6. `localhost` Is a Very Important Concept

Beginners ka common mistake:

```text
Backend Container
      ↓
localhost:3306
```

They think:

> "MySQL mere computer par hai, so localhost."

But inside a container:

```text
localhost
```

means:

> **The current container itself.**

So if you're inside the backend container:

```text
localhost
```

means:

```text
Backend Container
```

not your MySQL container.

---

## Example

```text
┌─────────────────┐
│ Backend         │
│ Container       │
│                 │
│ localhost       │ ← Backend itself
└─────────────────┘

┌─────────────────┐
│ MySQL           │
│ Container       │
└─────────────────┘
```

So backend should use:

```text
mysql:3306
```

not:

```text
localhost:3306
```

### Hinglish

Ye rule yaad kar lo:

> **Container ke andar `localhost` = woh container khud.**

Agar doosre container ko access karna hai:

```text
container-name:port
```

---

# 7. Port Mapping vs Docker Network

Ye bhi **extremely important** difference hai.

Suppose:

```bash
docker run -d \
  --name mysql \
  --network mynetwork \
  -p 3307:3306 \
  mysql
```

Here:

```text
-p 3307:3306
```

means:

```text
Host Port → Container Port
```

So:

```text
Your Computer
localhost:3307
      ↓
MySQL Container
3306
```

But another container on the same Docker network can usually connect directly using:

```text
mysql:3306
```

### Therefore:

```text
Host → Container
       ↓
   Port Mapping
```

while:

```text
Container → Container
       ↓
   Docker Network
```

---

# 8. Do Containers Need `-p` to Communicate?

**No.**

This is a very common misconception.

Suppose:

```bash
docker network create app-network
```

Then:

```bash
docker run -d \
  --name backend \
  --network app-network \
  backend-image
```

and:

```bash
docker run -d \
  --name mysql \
  --network app-network \
  mysql
```

Backend can communicate with MySQL through:

```text
mysql:3306
```

You don't need:

```bash
-p 3306:3306
```

for container-to-container communication.

### Hinglish

`-p` mainly tab useful hota hai jab **Docker ke bahar se container ke service ko access karna ho**.

---

# 9. Docker Network Drivers

Docker has different network drivers.

The most important ones you should learn are:

```text
bridge
host
none
overlay
macvlan
```

For beginners, focus primarily on:

> **bridge**

and later:

> **host + overlay**

---

# 10. Bridge Network

This is the most important network type for normal Docker applications.

There are two things you should understand:

```text
Default bridge
```

and

```text
User-defined bridge
```

---

# 11. Default Bridge

Docker normally has a default network called:

```text
bridge
```

Check:

```bash
docker network ls
```

You'll see:

```text
NETWORK ID     NAME      DRIVER
xxxx           bridge    bridge
```

You can run:

```bash
docker run -d --name app nginx
```

The container will use the default bridge network if no network is specified.

---

# 12. User-Defined Bridge

Better approach:

```bash
docker network create app-network
```

Then:

```bash
docker run -d \
  --name backend \
  --network app-network \
  backend-image
```

and:

```bash
docker run -d \
  --name database \
  --network app-network \
  mysql
```

### Why is this better?

User-defined bridge networks provide better isolation and automatic DNS-based container name resolution.

So:

```text
backend → database
```

can use:

```text
database
```

as the hostname.

---

# 13. Inspect a Network

Very useful command:

```bash
docker network inspect app-network
```

It gives you information such as:

* Network driver
* Subnet
* Gateway
* Connected containers
* IP addresses
* Network configuration

Example conceptually:

```text
Network: app-network

Subnet: 172.18.0.0/16

Containers:

backend
IP: 172.18.0.2

database
IP: 172.18.0.3
```

---

# 14. Connect Existing Container to Network

Suppose container already exists:

```text
backend
```

and network:

```text
app-network
```

Connect it:

```bash
docker network connect app-network backend
```

Now backend is connected to that network.

---

# 15. Disconnect Container

```bash
docker network disconnect app-network backend
```

Now backend is removed from that network.

---

# 16. Remove Network

First make sure no containers are using it.

Then:

```bash
docker network rm app-network
```

---

# 17. Multiple Networks

This is another important real-world concept.

Suppose:

```text
Frontend
    ↓
Backend
    ↓
Database
```

You might create:

```text
frontend-network
backend-network
```

Architecture:

```text
                frontend-network
                     │
                     ↓
                ┌─────────┐
                │Frontend │
                └────┬────┘
                     │
                ┌────┴────┐
                │ Backend │
                └────┬────┘
                     │
                backend-network
                     │
                     ↓
                ┌─────────┐
                │ Database│
                └─────────┘
```

Backend can belong to both networks.

Frontend doesn't need direct access to the database.

### Security Benefit

```text
Frontend ❌→ Database

Frontend → Backend → Database
```

This reduces unnecessary network access.

---

# 18. Docker DNS

This is one of the **most important concepts**.

Docker's user-defined networks provide internal DNS.

Suppose:

```text
Network: app-network

backend
database
redis
```

Then containers can use:

```text
database
redis
backend
```

as hostnames.

Example:

```javascript
host: "database"
```

Redis:

```javascript
host: "redis"
```

### Hinglish

Tumhe manually ye yaad rakhne ki zarurat nahi:

```text
172.18.0.4
172.18.0.5
```

Instead:

```text
database
redis
```

use karo.

That's much easier and reliable.

---

# 19. Container IP vs Container Name

Beginners often think:

```text
Database IP = 172.18.0.3
```

and code mein:

```javascript
host: "172.18.0.3"
```

But this is not ideal.

Container recreate hone par IP change ho sakti hai.

Better:

```javascript
host: "database"
```

because Docker DNS resolves the container/service name.

### Golden Rule

> **Don't hardcode container IPs. Use container/service names.**

---

# 20. External Internet Access

Docker containers can also communicate with the outside world.

Example:

```text
Container
    ↓
Docker Network
    ↓
Host Network
    ↓
Internet
```

So your Node.js container can make requests:

```javascript
fetch("https://api.example.com")
```

assuming the container/network configuration allows outbound connectivity.

---

# 21. Host Network

Another network driver:

```bash
docker run --network host nginx
```

### Technical

With the host network driver, the container uses the host's network namespace rather than getting a separate normal Docker network interface/IP.

### Hinglish

Normally:

```text
Host
 ↓
Docker Network
 ↓
Container
```

Host networking mein container host ke network ko much more directly use karta hai.

It can provide performance benefits in some scenarios, but reduces network isolation and behaves differently depending on the platform.

**Don't use it by default.** Learn it after understanding bridge networking.

---

# 22. None Network

You can completely disable normal networking:

```bash
docker run --network none nginx
```

Conceptually:

```text
Container
   ↓
No normal network connectivity
```

Useful when a container should have no network access.

---

# 23. Overlay Network

Overlay networks are especially important when working with:

* Docker Swarm
* Multi-host Docker environments

Conceptually:

```text
Server 1                 Server 2

Container A              Container B
     │                       │
     └──── Overlay Network ──┘
```

It allows containers/services running on different Docker hosts to communicate through an overlay network.

For a beginner, you don't need to master this immediately. First master **bridge networks, DNS, ports, and Compose networking**.

---

# 24. Docker Compose Networking ⭐

If you're learning Docker for real projects, **Docker Compose is extremely important**.

Instead of manually doing:

```bash
docker network create app-network
```

and:

```bash
docker run ...
```

Compose can create and connect networks automatically.

Example:

```yaml
services:

  backend:
    build: ./backend
    depends_on:
      - database

  database:
    image: mysql:8
```

Compose creates a network for the application.

Then backend can generally access:

```text
database:3306
```

because the service name becomes the DNS name inside the Compose network.

Architecture:

```text
Docker Compose
      ↓
 app-network
      │
 ┌────┴─────┐
 ↓          ↓
backend   database
```

---

# 25. Complete Real-World Example

Suppose you're building an e-commerce application:

```text
Frontend
Next.js

Backend
Node.js + Express

Database
MySQL

Cache
Redis
```

You could have:

```text
                  Internet
                     │
                     ↓
                 Frontend
                     │
                     ↓
                  Backend
                  /     \
                 ↓       ↓
              MySQL     Redis
```

Docker architecture:

```text
                  Docker
                    │
              app-network
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    frontend     backend      database
                    │
                    ↓
                  redis
```

Backend environment:

```env
DB_HOST=database
DB_PORT=3306

REDIS_HOST=redis
REDIS_PORT=6379
```

Notice:

```text
DB_HOST=database
```

not:

```text
DB_HOST=localhost
```

and usually not:

```text
DB_HOST=172.18.0.3
```

---

# 26. Commands You MUST Know

If you're learning Docker networking, memorize these first:

### List networks

```bash
docker network ls
```

### Create network

```bash
docker network create app-network
```

### Inspect network

```bash
docker network inspect app-network
```

### Run container on network

```bash
docker run -d \
  --name backend \
  --network app-network \
  backend-image
```

### Connect existing container

```bash
docker network connect app-network backend
```

### Disconnect

```bash
docker network disconnect app-network backend
```

### Remove network

```bash
docker network rm app-network
```

---

# 27. Most Important Concepts to Learn

Agar tum Docker Network ko properly master karna chahte ho, ye order follow karo:

### Level 1 — Must Know ⭐⭐⭐

```text
1. What is Docker Network?
2. Container-to-container communication
3. localhost inside containers
4. Port mapping (-p)
5. Bridge network
6. User-defined bridge
7. Container/service names
8. Docker DNS
```

### Level 2 — Important ⭐⭐

```text
9. docker network inspect
10. Network connect/disconnect
11. Multiple networks
12. Network isolation
13. Container IP vs DNS name
14. Docker Compose networking
```

### Level 3 — Advanced ⭐

```text
15. Host network
16. None network
17. Overlay network
18. Macvlan
19. Network namespaces
20. Subnets and gateways
21. Custom IPAM
22. Network security
```

---

# 28. Final Mental Model 🧠

Is diagram ko samajh lo, Docker networking ka foundation clear ho jayega:

```text
                     HOST MACHINE
                          │
                    Docker Engine
                          │
                    Docker Network
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ↓               ↓                ↓
      Frontend         Backend          Database
      Container        Container        Container
                          │
                          │
                          ↓
                        Redis
```

Communication:

```text
Frontend → Backend
          backend:3000

Backend → Database
          database:3306

Backend → Redis
          redis:6379
```

External user:

```text
Browser
   ↓
localhost:3000
   ↓
Port Mapping
   ↓
Frontend Container
```

And the **most important rule**:

```text
localhost
   ↓
Current container

container/service-name
   ↓
Another container
```

So if your Node.js backend is inside Docker and MySQL is another container:

```javascript
// ❌ Usually wrong
host: "localhost"

// ❌ Don't hardcode
host: "172.18.0.5"

// ✅ Correct approach
host: "database"
```

**Agar tum Docker ke next level par jaana chahte ho, Docker Network ke baad sabse important topic `Docker Compose` hai**, because real projects mein manually `docker run` commands ke bajaye frontend + backend + database ko Compose se connect karna bahut common workflow hai.
