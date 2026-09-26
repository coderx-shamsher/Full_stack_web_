Achha, ab exact error se problem clear ho gayi! 👇

```
Access denied for user 'ubuntu_root'@'%' to database 'usersApi'
```

Iska matlab: MySQL user `ubuntu_root` se connection aa raha hai, lekin us user ko `usersApi` database access karne ki permission nahi hai — ya uski database-level privileges properly set nahi hain.

Tumne new database create kiya hai, to possible hai ki database create ho gaya, lekin `ubuntu_root` ko uska access nahi diya gaya.

## Step 1: Docker MySQL mein root se login karo

Ubuntu terminal mein:

Bash

```
docker ps
```

Apne MySQL container ka naam identify karo. Phir:

Bash

```
docker exec -it <container-name> mysql -u root -p
```

MySQL root password enter karo.

> Yahan `root` MySQL ka user hai, Ubuntu ka user nahi.

## Step 2: Database aur user verify karo

MySQL prompt mein:

SQL

```
SHOW DATABASES;
```

Check karo `usersApi` list mein hai ya nahi.

Phir:

SQL

```
SELECT User, Host
FROM mysql.user
WHERE User = 'ubuntu_root';
```

Tumhare error mein `'ubuntu_root'@'%'` aa raha hai, matlab MySQL account ka host `%` hai.

## Step 3: User ko database ki permission do

MySQL prompt mein ye command run karo:

SQL

```
GRANT ALL PRIVILEGES ON usersApi.*
TO 'ubuntu_root'@'%';
```

Iska meaning:

* `usersApi.*` → `usersApi` database ke saare tables.

* `ubuntu_root` → jis user ko permission deni hai.

* `ALL PRIVILEGES` → database par required operations ki permissions, including SELECT, INSERT, UPDATE, DELETE, CREATE, etc.

`GRANT` ke baad normally `FLUSH PRIVILEGES` ki zarurat nahi hoti. Tum directly exit kar sakte ho:

SQL

```
EXIT;
```

## Step 4: Node.js server restart karo

Apne backend mein `.env` verify karo:

env

```
DB_HOST=localhost
DB_USER=ubuntu_root
DB_PASSWORD=your_actual_password
DB_NAME=usersApi
DB_PORT=3306
```

Agar Node host machine/WSL par run ho raha hai aur MySQL Docker mein hai, to `localhost:3306` tabhi sahi hoga jab Docker port publish ho.

Phir backend restart karo:

Bash

```
npm run dev
```

Ya jis command se tum server start karte ho.

## Step 5: Agar phir bhi error aaye

MySQL root prompt mein ye run karo:

SQL

```
SHOW GRANTS FOR 'ubuntu_root'@'%';
```

Expected output mein `usersApi` ke liye privileges hone chahiye, jaise:

SQL

```
GRANT ALL PRIVILEGES ON `usersApi`.*
TO `ubuntu_root`@`%`
```

### Ek important security note

Learning/local development ke liye `ALL PRIVILEGES` convenient hai. Production mein application user ko sirf required permissions dena better hai. Aur agar tumhe sirf CRUD chahiye, to `SELECT, INSERT, UPDATE, DELETE` sufficient ho sakte hain.

Pehle Step 3 ka `GRANT` command run karo. Tumhare exact error ke liye ye sabse likely fix hai.
