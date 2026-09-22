# MySQL Transactions & Auto-Commit

This is a **very important backend/database concept**. ⭐⭐⭐⭐⭐

A transaction is basically:

> **A group of SQL operations that should behave like one unit of work.**

If something goes wrong in the middle, we can **ROLLBACK** the changes instead of leaving the database in a partially updated state.

---

# 1. What is a Transaction?

Imagine transferring ₹1,000 from:

```text
Account A → Account B
```

There are two database operations:

```sql
UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;
```

and:

```sql
UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;
```

We have a problem if the first succeeds but the second fails.

We could end up with:

```text
Account A = -₹1,000
Account B = unchanged
```

That's bad.

A transaction lets us say:

```text
START TRANSACTION

Operation 1
Operation 2

If everything works:
    COMMIT

If something fails:
    ROLLBACK
```

Conceptually:

```text
           TRANSACTION
                │
       ┌────────┴────────┐
       ↓                 ↓
    Success            Failure
       ↓                 ↓
    COMMIT            ROLLBACK
       ↓                 ↓
   Save changes     Undo changes
```

---

# 2. Basic Transaction Syntax ⭐⭐⭐⭐⭐

MySQL provides:

```sql
START TRANSACTION;

-- SQL operations

COMMIT;
```

or:

```sql
START TRANSACTION;

-- SQL operations

ROLLBACK;
```

You may also see:

```sql
BEGIN;
```

`BEGIN` can be used to start a transaction.

For clarity, I recommend learning:

```sql
START TRANSACTION;
```

first.

---

# 3. COMMIT

`COMMIT` means:

> **Make the changes permanent.**

Example:

```sql
START TRANSACTION;

UPDATE employees
SET salary = salary + 5000
WHERE id = 1;

COMMIT;
```

After `COMMIT`, the salary change is saved.

---

# 4. ROLLBACK

`ROLLBACK` means:

> **Undo the changes made during the current transaction.**

Example:

```sql
START TRANSACTION;

UPDATE employees
SET salary = salary + 5000
WHERE id = 1;

ROLLBACK;
```

The salary increase is undone.

---

# 5. Real Example — Bank Transfer ⭐⭐⭐⭐⭐

Suppose:

```text
Account 1 = ₹10,000
Account 2 = ₹5,000
```

We want:

```text
₹2,000
Account 1 → Account 2
```

We should do:

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 2000
WHERE id = 2;

COMMIT;
```

If both operations succeed:

```text
Account 1 = ₹8,000
Account 2 = ₹7,000
```

---

## What if something fails?

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

-- Something goes wrong here

UPDATE accounts
SET balance = balance + 2000
WHERE id = 999;

ROLLBACK;
```

The first update is also undone.

So we don't end up with:

```text
Account 1 = ₹8,000
Account 2 = ₹5,000
```

Instead:

```text
Account 1 = ₹10,000
Account 2 = ₹5,000
```

The database returns to the state before the transaction.

---

# 6. Now the Important Part — Auto-Commit ⭐⭐⭐⭐⭐

By default, MySQL generally operates with:

```text
autocommit = ON
```

You can check it:

```sql
SELECT @@autocommit;
```

Typically:

```text
1
```

means:

```text
AUTOCOMMIT ON
```

and:

```text
0
```

means:

```text
AUTOCOMMIT OFF
```

---

# 7. What Does Auto-Commit Actually Mean?

When autocommit is ON:

```sql
UPDATE employees
SET salary = salary + 5000
WHERE id = 1;
```

MySQL effectively treats the statement as its own transaction and commits it automatically if successful.

Conceptually:

```text
UPDATE
   ↓
Transaction
   ↓
Success
   ↓
Automatic COMMIT
```

So you don't have to write:

```sql
COMMIT;
```

for every individual statement.

---

# 8. Example of Auto-Commit

Suppose:

```sql
SELECT @@autocommit;
```

returns:

```text
1
```

Then:

```sql
UPDATE employees
SET salary = salary + 5000
WHERE id = 1;
```

The update is automatically committed.

Now:

```sql
ROLLBACK;
```

will **not normally undo that already committed change**.

That's an extremely important point.

---

# 9. Turning Auto-Commit OFF

You can do:

```sql
SET autocommit = 0;
```

Now MySQL won't automatically commit each statement.

Example:

```sql
SET autocommit = 0;

UPDATE employees
SET salary = salary + 5000
WHERE id = 1;
```

At this point, the change hasn't been committed.

You can:

```sql
COMMIT;
```

to save it.

Or:

```sql
ROLLBACK;
```

to undo it.

---

# 10. Turning Auto-Commit ON Again

```sql
SET autocommit = 1;
```

But there's an important practical detail:

**Don't casually toggle autocommit inside application code without understanding transaction boundaries.**

In backend applications, it's usually better to explicitly define a transaction:

```sql
START TRANSACTION;

-- operation 1
-- operation 2
-- operation 3

COMMIT;
```

and rollback if an error occurs.

---

# 11. `START TRANSACTION` vs Auto-Commit

This is the part you should remember.

### Auto-commit ON

```sql
UPDATE employees
SET salary = salary + 1000
WHERE id = 1;
```

Think:

```text
UPDATE → COMMIT automatically
```

### Explicit transaction

```sql
START TRANSACTION;

UPDATE employees
SET salary = salary + 1000
WHERE id = 1;

UPDATE employees
SET salary = salary + 2000
WHERE id = 2;

COMMIT;
```

Think:

```text
UPDATE 1
   ↓
UPDATE 2
   ↓
COMMIT
```

Both updates are treated as one unit.

---

# 12. Why Transactions Matter in Backend ⭐⭐⭐⭐⭐

Imagine your backend handles:

```text
POST /orders
```

Creating an order might require:

```text
1. Create order
2. Create order items
3. Reduce product stock
4. Create payment record
5. Update user's order count
```

You don't want:

```text
Order created       ✅
Order items         ✅
Stock reduced       ✅
Payment record      ❌
```

Now your database is inconsistent.

Instead:

```text
START TRANSACTION

Create order
Create order items
Reduce stock
Create payment record
Update order count

       ↓

Everything successful?
       ↓
     COMMIT
```

If something fails:

```text
ROLLBACK
```

This is where transactions become extremely important in real backend engineering.

---

# 13. Node.js + MySQL Example ⭐⭐⭐⭐⭐

Since you're learning backend with Node.js, understand how this looks from the backend.

Using the `mysql2` package:

```js
const connection = await pool.getConnection();

try {
    await connection.beginTransaction();

    await connection.query(
        `UPDATE accounts
         SET balance = balance - ?
         WHERE id = ?`,
        [2000, 1]
    );

    await connection.query(
        `UPDATE accounts
         SET balance = balance + ?
         WHERE id = ?`,
        [2000, 2]
    );

    await connection.commit();

    console.log("Transfer successful");

} catch (error) {

    await connection.rollback();

    console.error("Transfer failed:", error);

} finally {

    connection.release();
}
```

Notice the structure:

```text
get connection
      ↓
beginTransaction()
      ↓
query 1
      ↓
query 2
      ↓
commit()
      ↓
release connection
```

If anything throws an error:

```text
catch
  ↓
rollback()
  ↓
release connection
```

This is a **very common production pattern**.

---

# 14. Transaction ≠ One SQL Query

This distinction is important.

You can have:

```sql
START TRANSACTION;

INSERT ...
UPDATE ...
DELETE ...
SELECT ...

COMMIT;
```

A transaction can contain **multiple SQL statements**.

The purpose is to make the group behave as one logical unit.

---

# 15. ACID ⭐⭐⭐⭐⭐

Transactions are strongly associated with **ACID** properties.

```text
A → Atomicity
C → Consistency
I → Isolation
D → Durability
```

You absolutely need to know this for backend interviews.

### Atomicity

> All operations happen, or none happen.

```text
Transfer:
Debit + Credit

Both → success
or
Both → rollback
```

### Consistency

The database moves from one valid state to another valid state.

### Isolation

Concurrent transactions shouldn't improperly interfere with each other.

For example:

```text
Transaction A
Transaction B
```

running at the same time.

MySQL's transaction isolation mechanisms control what each transaction can see.

### Durability

After a successful commit, the changes should survive failures according to the database's durability guarantees.

---

# 16. One Very Important Rule

Transactions generally require a **transactional storage engine**.

For modern MySQL applications, this usually means:

```text
InnoDB
```

Check your table:

```sql
SHOW TABLE STATUS LIKE 'employees';
```

or:

```sql
SHOW CREATE TABLE employees;
```

You generally want:

```text
ENGINE=InnoDB
```

---

# 17. SAVEPOINT ⭐⭐⭐⭐

There's another useful transaction feature.

```sql
START TRANSACTION;

UPDATE employees
SET salary = salary + 1000
WHERE id = 1;

SAVEPOINT salary_update;

UPDATE employees
SET salary = salary + 5000
WHERE id = 2;
```

Now you can rollback only to the savepoint:

```sql
ROLLBACK TO SAVEPOINT salary_update;
```

The first update remains, while the later work is rolled back.

Then:

```sql
COMMIT;
```

---

# 18. The Mental Model You Should Remember

Don't think:

> "Transaction means COMMIT and ROLLBACK."

Think:

```text
TRANSACTION
    │
    ├── Multiple related operations
    │
    ├── All succeed
    │       ↓
    │     COMMIT
    │
    └── Something fails
            ↓
         ROLLBACK
```

And:

```text
AUTOCOMMIT = ON
        ↓
Each standalone statement is normally
committed automatically if successful.
```

---

# ⭐ What Matters Most

For your backend learning, master these first:

```text
⭐⭐⭐⭐⭐
START TRANSACTION
COMMIT
ROLLBACK
AUTOCOMMIT
ACID
InnoDB
```

Then:

```text
⭐⭐⭐⭐
SAVEPOINT
Transaction isolation
Isolation levels
Deadlocks
Locks
SELECT ... FOR UPDATE
```

And later:

```text
⭐⭐⭐
Distributed transactions
2-phase commit
Saga pattern
```

### Your most important example

Memorize the **pattern**, not just the commands:

```sql
START TRANSACTION;

-- operation 1
-- operation 2
-- operation 3

-- everything successful?
COMMIT;

-- something failed?
ROLLBACK;
```

And in Node.js:

```js
try {
    await connection.beginTransaction();

    // queries...

    await connection.commit();
} catch (error) {
    await connection.rollback();
    throw error;
} finally {
    connection.release();
}
```

That pattern is **extremely important for real-world backend development**.
