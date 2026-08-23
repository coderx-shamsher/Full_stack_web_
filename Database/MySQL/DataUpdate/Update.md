## UPDATE ka simple concept

`UPDATE` existing rows ka data change karta hai. `SET` batata hai **kya change karna hai**, aur `WHERE` batata hai **kis row/rows ko change karna hai**. `WHERE` na likhne par table ki **har row** update ho jaati hai. [dev.mysql](https://dev.mysql.com/doc/refman/8.4/en/update.html)

Basic syntax:

```sql
UPDATE table_name
SET column_name = new_value
WHERE condition;
```

Assume table:

```sql
users(id, name, email, age, status, city, points)
```

## Common examples

```sql
-- One column, one user
UPDATE users
SET status = 'active'
WHERE id = 1;
```

```sql
-- Multiple columns, one user
UPDATE users
SET name = 'Dev Kumar',
    city = 'Patiala',
    status = 'active'
WHERE id = 1;
```

```sql
-- String value update
UPDATE users
SET city = 'Chandigarh'
WHERE email = 'dev@example.com';
```

```sql
-- Numeric value update
UPDATE users
SET points = 100
WHERE id = 5;
```

```sql
-- Existing value ke basis par update
UPDATE users
SET points = points + 10
WHERE id = 5;
```

`SET points = points + 10` ka meaning: current points lo, usme 10 add karo, aur new value save karo.

## Multiple rows update

```sql
-- All inactive users ko active karo
UPDATE users
SET status = 'active'
WHERE status = 'inactive';
```

```sql
-- Complex filter with AND and OR
UPDATE users
SET points = points + 50
WHERE status = 'active'
  AND (city = 'Patiala' OR city = 'Chandigarh');
```

```sql
-- IN ke saath selected users update
UPDATE users
SET status = 'premium'
WHERE id IN (1, 3, 7);
```

```sql
-- Age range ke users update
UPDATE users
SET status = 'adult'
WHERE age BETWEEN 18 AND 60;
```

## Dangerous update

```sql
-- Yeh har user ka status inactive kar dega
UPDATE users
SET status = 'inactive';
```

Isko tabhi use karo jab genuinely sab rows update karni hon. Production database mein pehle same condition ke saath `SELECT` chala kar verify karna best practice hai. 

```sql
-- Step 1: Pehle check karo kaunse users affect honge
SELECT *
FROM users
WHERE status = 'inactive';

-- Step 2: Phir update chalao
UPDATE users
SET status = 'active'
WHERE status = 'inactive';
```

## LIMIT and IGNORE

MySQL single-table `UPDATE` mein `ORDER BY` aur `LIMIT` support karta hai. 

```sql
-- Sirf 5 oldest inactive users update karo
UPDATE users
SET status = 'active'
WHERE status = 'inactive'
ORDER BY id ASC
LIMIT 5;
```

```sql
-- Constraint/data conversion issues par error ki jagah warnings ke saath continue karne ki koshish
UPDATE IGNORE users
SET email = 'same@email.com'
WHERE id IN (1, 2);
```

`UPDATE IGNORE` ko carefully use karo: error hide ho sakta hai aur unexpected data result aa sakta hai. Normal application code mein constraints fix karna better hota hai than errors ignore karna. 

Ek important safety habit: tum `UPDATE` se pehle kaunsi `SELECT` query likhoge agar tumhe sirf `id = 10` wale user ke points mein 20 add karne hain?

---


## my code -> 

```sql
SHOW DATABASES;


USE mysqladmin;


SHOW TABLES; 


SELECT * FROM admins;


## adding columns 
ALTER TABLE admins ADD COLUMN Age INT NOT NULL;

## update age 
UPDATE admins SET `Age` = 19 ; 

-- without where k ager ham update use krte hain to sare  he rows update hoti hai jo ki not a professional way

SELECT * FROM admins;

UPDATE admins SET `IsActive` = FALSE, `Age` = 18 WHERE id = 1;
UPDATE admins SET `IsActive` = FALSE, `Age` = 17 WHERE id = 3;
UPDATE admins SET `IsActive` = FALSE, `Age` = 18 WHERE id = 5;
UPDATE admins SET `IsActive` = FALSE, `Age` = 17 WHERE id = 7;

## updating gmail using the id 
UPDATE admins SET `Email` = "adminy6@gmail.com" WHERE id = 6;

SELECT * FROM admins;


 -- make sure k where k bina koi bhi update queries run malt kro
 

```
