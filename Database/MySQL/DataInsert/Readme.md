## Data Retrieval queries 

This is the core of **reading data** in SQL: `SELECT` gets data, `FROM` tells SQL which table to read, and `WHERE` decides which rows are allowed in the result. 

Use this order to remember a typical query:

```sql
SELECT columns
FROM table
WHERE condition
ORDER BY column
LIMIT number;
```

## Important corrections

- Prefer aliases with backticks or no quotes in MySQL. Single quotes normally represent text values, not column names.

```sql
SELECT name AS new_name
FROM users;
```

For a readable alias containing spaces:

```sql
SELECT name AS `User Name`
FROM users;
```

- `BETWEEN` includes **both** endpoints. So this includes prices 10, 50, and every value between them. 

```sql
SELECT *
FROM products
WHERE price BETWEEN 10 AND 50;
```

- `LIKE 'J%'` means names starting with `J`; `%` means “zero or more characters.” 

```sql
SELECT *
FROM users
WHERE name LIKE 'J%';
```

## Real-world query

Suppose you need the newest 10 active Indian users:

```sql
SELECT id, name, email
FROM users
WHERE status = 'active'
  AND country = 'India'
ORDER BY created_at DESC
LIMIT 10;
```

Read it in English: “Get `id`, `name`, and `email` from `users`, but only active users from India; sort newest first; show only 10.” Selecting explicit columns is generally better than using `SELECT *`, especially in application code, because it returns only the data needed. 

## Most important learning order

Master these before moving to joins:

1. `SELECT column_name FROM table_name`
2. `WHERE` with `=`, `>`, `<`
3. `AND`, `OR`, and parentheses
4. `IN`, `BETWEEN`, `LIKE`
5. `ORDER BY`
6. `LIMIT` and `OFFSET`
7. `DISTINCT`

--- 

## One table for practice

Assume this MySQL table:

```sql
products
```

Columns:

```sql
id, name, category, price, stock, status, brand, created_at
```

Example values: `status = 'active'`, `category = 'Laptop'`, `brand = 'Dell'`.

`SELECT` retrieves rows, while `WHERE` filters them based on conditions. 

## Basic retrieval

```sql
-- All columns
SELECT *
FROM products;
```

```sql
-- Only needed columns: preferred in real projects
SELECT id, name, price
FROM products;
```

```sql
-- Rename a result column
SELECT name AS product_name,
       price AS product_price
FROM products;
```

```sql
-- Unique categories only
SELECT DISTINCT category
FROM products;
```

```sql
-- Unique combinations, not just unique categories
SELECT DISTINCT category, brand
FROM products;
```

`DISTINCT` removes duplicate **result combinations**. So `DISTINCT category, brand` treats both columns together. 

## WHERE conditions

```sql
-- Exact match
SELECT id, name, price
FROM products
WHERE status = 'active';
```

```sql
-- Greater than
SELECT name, price
FROM products
WHERE price > 50000;
```

```sql
-- Less than
SELECT name, stock
FROM products
WHERE stock < 10;
```

```sql
-- Not equal
SELECT name, status
FROM products
WHERE status <> 'discontinued';
```

```sql
-- AND: both conditions must be true
SELECT name, price
FROM products
WHERE category = 'Laptop'
  AND price < 80000;
```

```sql
-- OR: at least one condition must be true
SELECT name, category
FROM products
WHERE category = 'Laptop'
   OR category = 'Mobile';
```

```sql
-- Parentheses control the logic
SELECT name, category, price, status
FROM products
WHERE status = 'active'
  AND (category = 'Laptop' OR category = 'Mobile');
```

Use parentheses whenever `AND` and `OR` appear together, so the intended logic stays clear. 

## IN, BETWEEN, LIKE, NULL

```sql
-- IN: matches any value in the list
SELECT name, brand, price
FROM products
WHERE brand IN ('Dell', 'HP', 'Lenovo');
```

```sql
-- NOT IN: excludes values in the list
SELECT name, category
FROM products
WHERE category NOT IN ('Accessories', 'Refurbished');
```

```sql
-- BETWEEN includes both 500 and 2000
SELECT name, price
FROM products
WHERE price BETWEEN 500 AND 2000;
```

```sql
-- LIKE: starts with "Sam"
SELECT name, price
FROM products
WHERE name LIKE 'Sam%';
```

```sql
-- LIKE: ends with "Pro"
SELECT name, price
FROM products
WHERE name LIKE '%Pro';
```

```sql
-- LIKE: contains "phone"
SELECT name, price
FROM products
WHERE name LIKE '%phone%';
```

```sql
-- _ means exactly one unknown character
SELECT name
FROM products
WHERE name LIKE '_phone';
```

```sql
-- Correct way to check missing values
SELECT name, brand
FROM products
WHERE brand IS NULL;
```

```sql
-- Correct way to check values that exist
SELECT name, brand
FROM products
WHERE brand IS NOT NULL;
```

`WHERE` returns only records whose condition evaluates to true. 

## Sort, limit, pagination

```sql
-- Lowest price first; ASC is optional
SELECT name, price
FROM products
ORDER BY price ASC;
```

```sql
-- Highest price first
SELECT name, price
FROM products
ORDER BY price DESC;
```

```sql
-- Sort by category, then expensive products first within each category
SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC;
```

```sql
-- First 10 newest products
SELECT id, name, created_at
FROM products
ORDER BY created_at DESC
LIMIT 10;
```

```sql
-- Pagination: page 3, with 10 records per page
SELECT id, name, price
FROM products
ORDER BY id
LIMIT 10 OFFSET 20;
```

For page \(n\), calculate offset as:

\[
\text{offset} = (\text{page number} - 1) \times \text{page size}
\]

MySQL also supports this equivalent pagination syntax:

```sql
SELECT id, name, price
FROM products
ORDER BY id
LIMIT 20, 10;
```

## Full practical query

This is the type of query you will write in real applications:

```sql
SELECT DISTINCT id, name, category, brand, price
FROM products
WHERE status = 'active'
  AND stock > 0
  AND category IN ('Laptop', 'Mobile')
  AND price BETWEEN 20000 AND 100000
  AND name LIKE '%Pro%'
ORDER BY price DESC, name ASC
LIMIT 10 OFFSET 0;
```

Read it as: get unique active, in-stock laptops or mobiles priced from 20,000 to 100,000 whose name contains “Pro”; show expensive items first, then name order; return the first 10. A common complete `SELECT` structure can include `WHERE`, `ORDER BY`, and `LIMIT/OFFSET` in that sequence. 

<!-- Write the SQL for this requirement in your own words: “Get distinct brands of active products that have stock greater than 5, ordered alphabetically.” -->