## Constraints kya hote hain?

**Constraints database-level rules** hote hain. Inka kaam invalid, duplicate, missing, ya unrelated data ko table mein enter/update hone se rokna hai. MySQL mein important constraint types hain: `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, aur `DEFAULT`. 

## Constraints add karne ke 2 ways

### 1. Table create karte time — best way

Nayi table ke liye constraints ko `CREATE TABLE` mein hi define karo:

```sql
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age TINYINT UNSIGNED,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',

  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT uq_users_email UNIQUE (email),
  CONSTRAINT chk_users_age CHECK (age >= 13 AND age <= 120)
);
```

Isme:
- `NOT NULL`: name/email empty nahi reh sakte.
- `PRIMARY KEY`: `id` har row ki unique identity hai.
- `UNIQUE`: same email do baar store nahi ho sakti.
- `DEFAULT`: status na do to `'active'` save hoga.
- `CHECK`: age valid range mein honi chahiye. MySQL `CHECK` constraints ko column level ya table level dono par allow karta hai. 

### 2. Existing table mein — `ALTER TABLE`

Existing production table ko change karne ke liye `ALTER TABLE` use hota hai:

```sql
-- Missing values stop karo
ALTER TABLE users
MODIFY name VARCHAR(100) NOT NULL;
```

```sql
-- Unique email rule add karo
ALTER TABLE users
ADD CONSTRAINT uq_users_email UNIQUE (email);
```

```sql
-- Age validation add karo
ALTER TABLE users
ADD CONSTRAINT chk_users_age
CHECK (age >= 13 AND age <= 120);
```

`ALTER TABLE` se primary key, unique constraint, foreign key, aur check constraint add kiye ja sakte hain; ek statement mein multiple changes comma se bhi likhe ja sakte hain. 
## Foreign key example

```sql
CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  total DECIMAL(10, 2) NOT NULL,

  CONSTRAINT pk_orders PRIMARY KEY (id),

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);
```

`orders.user_id` ko `users.id` se match karna mandatory ho gaya. Isse kisi non-existing user ka order save nahi hoga. Foreign key behavior mein `RESTRICT`, `CASCADE`, aur `SET NULL` jaise options choose kiye ja sakte hain. 

## Professional best practices

- **Har table mein primary key** rakho—usually `BIGINT UNSIGNED AUTO_INCREMENT`.
- Business identifiers par `UNIQUE` lagao: email, username, order number; sirf app validation par depend mat karo.
- Required fields ke liye `NOT NULL` use karo; unknown value ke liye `NULL` ko intentional rakho.
- Money ke liye `DECIMAL(10,2)` use karo, `FLOAT` nahi.
- Constraint names clear rakho: `pk_users`, `uq_users_email`, `fk_orders_user`, `chk_users_age`. MySQL constraint names auto-generate kar sakta hai, but named constraints migrations aur debugging ko easy banate hain. 
- Foreign key add karne se pehle existing orphan data fix karo, aur referenced column ko primary key ya unique key banao.
- Production mein `ALTER TABLE` se pehle backup aur a `SELECT` validation chalao; large tables par schema changes locks/performance impact create kar sakte hain.

<!-- Agar `users` table mein `phone` column hai, to tum uske liye kaunsa constraint choose karoge—`NOT NULL`, `UNIQUE`, dono, ya koi nahi—and why? -->



---
*** 

```sql
ALTER Table `data` ADD CONSTRAINT not_null_id  NOT NULL (id);
```
## Why it fails

Your syntax treats `NOT NULL` like a separately named table constraint:

```sql
ALTER TABLE `data`
ADD CONSTRAINT not_null_id NOT NULL (id);
```

But in MySQL, `NOT NULL` is part of the **column definition**, not a standalone `ADD CONSTRAINT` clause. So use `MODIFY COLUMN` and include the column’s data type.

## Correct query

If `id` is an integer:

```sql
ALTER TABLE `data`
MODIFY COLUMN id INT NOT NULL;
```

If your original column is auto-incrementing, retain that attribute too:

```sql
ALTER TABLE `data`
MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
```

If `id` is also the table identity, it should normally be a primary key:

```sql
ALTER TABLE `data`
MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT,
ADD CONSTRAINT pk_data PRIMARY KEY (id);
```

`MODIFY` requires the full intended column definition—especially its data type and attributes such as `AUTO_INCREMENT` or `DEFAULT`—otherwise an existing attribute can be lost. 

## Check first

Before changing it, check whether any existing row has `NULL` in `id`:

```sql
SELECT *
FROM `data`
WHERE id IS NULL;
```

If results appear, fix or delete those rows first; MySQL cannot safely make the column `NOT NULL` while it contains null values. 

<!-- What does this query return in your table: `SELECT * FROM data WHERE id IS NULL;`? -->


---


## MySQL: existing constraints delete karna

MySQL mein constraint type ke hisaab se different syntax hota hai. Pehle table structure check karo:

```sql
SHOW CREATE TABLE `data`;
```

Isse actual constraint/index names mil jayenge.

## Constraint-wise commands

```sql
-- PRIMARY KEY remove
ALTER TABLE `data`
DROP PRIMARY KEY;
```

```sql
-- UNIQUE constraint remove
-- MySQL mein UNIQUE usually index ke through remove hota hai
ALTER TABLE `data`
DROP INDEX uq_data_email;
```

```sql
-- FOREIGN KEY remove
ALTER TABLE `orders`
DROP FOREIGN KEY fk_orders_user;
```

```sql
-- CHECK constraint remove
ALTER TABLE `data`
DROP CHECK chk_data_age;
```

MySQL mein primary key, foreign key, check, aur unique constraints drop karne ke syntax alag hote hain; particularly `UNIQUE` key ko `DROP INDEX` se remove kiya jata hai. [w3schools](https://www.w3schools.com/sql/sql_ref_drop_constraint.asp)

## NOT NULL remove karna

`NOT NULL` ka koi separate constraint name nahi hota. Column ko `NULL` allow karne ke liye `MODIFY COLUMN` use hota hai—and data type dobara likhna mandatory hota hai:

```sql
ALTER TABLE `data`
MODIFY COLUMN id INT NULL;
```

Agar column mein `AUTO_INCREMENT` bhi hai, usse retain karo:

```sql
ALTER TABLE `data`
MODIFY COLUMN id INT NULL AUTO_INCREMENT;
```

Lekin note: `AUTO_INCREMENT` column ko key/index chahiye, aur primary-key `id` ko nullable banana generally bad database design hai.

## Safety check

Constraint remove karne se pehle samjho ki woh data ko kis invalid condition se protect kar raha tha. For example, `UNIQUE(email)` remove karoge to duplicate emails insert ho sakte hain; foreign key remove karoge to orphan records create ho sakte hain.

Tum `SHOW CREATE TABLE data;` ka output share kar sakte ho—kaunsa exact constraint remove karna hai aur uska naam kya show ho raha hai?