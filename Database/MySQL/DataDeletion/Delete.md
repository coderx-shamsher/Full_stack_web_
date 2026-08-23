## MySQL mein delete karne ke 3 main ways

Data delete karne ke liye mainly ye commands use hoti hain:

| Command | Kya delete hota hai | Table bachi rehti hai? |
|---|---|---|
| `DELETE` | Selected rows ya all rows | Yes |
| `TRUNCATE` | Table ki all rows | Yes |
| `DROP TABLE` | Rows + poori table structure | No |

`DELETE` one or more rows remove karta hai while table structure ko preserve karta hai. 

## 1. DELETE: specific data delete

Ye sabse common aur safe approach hai, kyunki `WHERE` se exact rows choose karte ho.

```sql
-- Ek user delete
DELETE FROM users
WHERE id = 10;
```

```sql
-- Multiple users delete
DELETE FROM users
WHERE id IN (4, 7, 9);
```

```sql
-- Condition ke according delete
DELETE FROM users
WHERE status = 'inactive'
  AND created_at < '2025-01-01';
```

Pehle same `WHERE` ke saath `SELECT` chalao, phir delete:

```sql
SELECT *
FROM users
WHERE id = 10;

DELETE FROM users
WHERE id = 10;
```

`WHERE` omit karne par `DELETE` table ki all rows remove kar deta hai. 

```sql
-- All rows delete, but users table remains
DELETE FROM users;
```

## 2. DELETE with LIMIT

Agar kuch limited rows delete karni hain:

```sql
-- Sabse purane 5 inactive users delete
DELETE FROM users
WHERE status = 'inactive'
ORDER BY created_at ASC
LIMIT 5;
```

`ORDER BY` decide karta hai kaunsi rows first select hongi, aur `LIMIT` maximum deleted rows decide karta hai. 

## 3. TRUNCATE vs DROP

```sql
-- Table empty karega, structure rahega
TRUNCATE TABLE users;
```

`TRUNCATE` tab use karo jab test table ya temporary data ki **saari rows** fast remove karni hon.

```sql
-- Table aur uska data dono permanently remove
DROP TABLE users;
```

`DROP TABLE` ke baad `users` table exist hi nahi karegi; use karne ke liye dobara `CREATE TABLE` karna padega. 

**Yaad rakhne ka shortcut:**
- `DELETE` = selected records delete.
- `TRUNCATE` = table empty.
- `DROP` = table hi khatam.

Agar tumhe sirf `status = 'inactive'` aur `points = 0` wale users delete karne hon, to pehle verification ke liye kaunsi `SELECT` query likhoge?