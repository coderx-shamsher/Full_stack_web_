## Your notes are correct

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

- `BETWEEN` includes **both** endpoints. So this includes prices 10, 50, and every value between them. [github](https://github.com/treehouse/cheatsheets/blob/master/sql_basics/cheatsheet.md)

```sql
SELECT *
FROM products
WHERE price BETWEEN 10 AND 50;
```

- `LIKE 'J%'` means names starting with `J`; `%` means “zero or more characters.” [github](https://github.com/treehouse/cheatsheets/blob/master/sql_basics/cheatsheet.md)

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

Read it in English: “Get `id`, `name`, and `email` from `users`, but only active users from India; sort newest first; show only 10.” Selecting explicit columns is generally better than using `SELECT *`, especially in application code, because it returns only the data needed. [learningsql](https://learningsql.org/ide/02-selecting-data)

## Most important learning order

Master these before moving to joins:

1. `SELECT column_name FROM table_name`
2. `WHERE` with `=`, `>`, `<`
3. `AND`, `OR`, and parentheses
4. `IN`, `BETWEEN`, `LIKE`
5. `ORDER BY`
6. `LIMIT` and `OFFSET`
7. `DISTINCT`

