Yes. This is a **core SQL/database topic** and very important for backend development. Let's build the mental model properly.

# 1. First: What is a Key vs Constraint?

These are related but **not exactly the same thing**.

### Key

A **key** identifies rows or establishes relationships between tables.

Important keys:

```text
PRIMARY KEY
FOREIGN KEY
COMPOSITE KEY
UNIQUE KEY
CANDIDATE KEY
```

### Constraint

A **constraint** is a rule that MySQL enforces on your data.

Important MySQL constraints:

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
CHECK
DEFAULT
```

So when you ask:

> "Primary key, foreign key, composite key ke saath kaun-kaun se constraints use karte hain?"

The important thing is to understand **which constraints are commonly combined with which keys**.

---

# 2. PRIMARY KEY ⭐⭐⭐⭐⭐

A primary key uniquely identifies every row.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);
```

Here:

```text
id
 ↓
PRIMARY KEY
```

Rules:

* Must be unique
* Cannot be `NULL`
* Only one primary-key constraint per table
* Can consist of **one or multiple columns**

---

# 3. PRIMARY KEY + AUTO_INCREMENT ⭐⭐⭐⭐⭐

This is probably the most common combination you'll use.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);
```

Now:

```sql
INSERT INTO employees (name, salary)
VALUES ('Rahul', 50000);
```

You don't provide `id`.

MySQL generates:

```text
1
```

Next:

```text
2
3
4
...
```

### Real-world use

```text
users
products
orders
employees
payments
posts
comments
```

Usually have an ID.

---

# 4. PRIMARY KEY + NOT NULL

Technically, a primary key is already non-null.

So:

```sql
id INT PRIMARY KEY NOT NULL
```

is redundant.

Better:

```sql
id INT PRIMARY KEY
```

because:

```text
PRIMARY KEY
    ↓
UNIQUE + NOT NULL
```

---

# 5. PRIMARY KEY + DEFAULT

Be careful here.

You normally don't need:

```sql
id INT PRIMARY KEY DEFAULT ...
```

when you're using `AUTO_INCREMENT`.

For other columns, however:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
);
```

Here:

```text
id
 └── PRIMARY KEY + AUTO_INCREMENT

name
 └── NOT NULL

status
 └── DEFAULT
```

This is a very common production pattern.

---

# 6. PRIMARY KEY + CHECK ⭐⭐⭐⭐

You can also combine a primary key with validation constraints.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18),
    salary DECIMAL(10,2) CHECK (salary >= 0)
);
```

Now MySQL won't allow:

```sql
INSERT INTO employees
(name, age, salary)
VALUES ('Rahul', 15, -5000);
```

because the constraints fail.

---

# 7. FOREIGN KEY ⭐⭐⭐⭐⭐

A foreign key creates a **relationship between two tables**.

Suppose:

```text
departments
```

```text
id
1
2
3
```

And:

```text
employees
```

```text
id
name
department_id
```

`department_id` should refer to:

```text
departments.id
```

So:

```sql
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
```

Then:

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,

    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
);
```

Relationship:

```text
departments
┌──────────────┐
│ id PK        │
│ name         │
└──────┬───────┘
       │
       │ referenced by
       ↓
employees
┌────────────────────┐
│ id PK              │
│ name               │
│ department_id FK   │
└────────────────────┘
```

---

# 8. FOREIGN KEY + NOT NULL ⭐⭐⭐⭐⭐

This is **very common**.

Suppose every employee MUST belong to a department.

Then:

```sql
department_id INT NOT NULL,

FOREIGN KEY (department_id)
    REFERENCES departments(id)
```

Complete:

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,

    department_id INT NOT NULL,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
);
```

Meaning:

```text
NOT NULL
+
FOREIGN KEY
```

means:

> Every employee must have a valid department.

---

# 9. FOREIGN KEY + NULL ⭐⭐⭐⭐⭐

Sometimes a relationship is optional.

Example:

An employee may or may not have a manager.

```sql
manager_id INT NULL,

FOREIGN KEY (manager_id)
    REFERENCES employees(id)
```

Now:

```text
manager_id = 5
```

means manager #5.

But:

```text
manager_id = NULL
```

means:

> This employee currently has no manager.

This is an important distinction.

---

# 10. FOREIGN KEY + ON DELETE ⭐⭐⭐⭐⭐

One of the most important FK features.

Example:

```sql
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE CASCADE
```

Suppose:

```text
Department 10
   ↓
Employee 1
Employee 2
Employee 3
```

If department 10 gets deleted:

```text
Department 10 ❌
Employee 1    ❌
Employee 2    ❌
Employee 3    ❌
```

because of:

```sql
ON DELETE CASCADE
```

### But be careful

`CASCADE` can delete a lot of related data.

Don't blindly use it.

---

# 11. FOREIGN KEY + ON DELETE SET NULL ⭐⭐⭐⭐⭐

Another common option.

```sql
manager_id INT NULL,

FOREIGN KEY (manager_id)
REFERENCES employees(id)
ON DELETE SET NULL
```

If manager #5 is deleted:

```text
manager_id = 5
```

becomes:

```text
manager_id = NULL
```

The employee remains.

This is useful when the relationship is optional.

---

# 12. FOREIGN KEY + ON DELETE RESTRICT

```sql
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE RESTRICT
```

Now if employees are still referencing department #10:

```sql
DELETE FROM departments
WHERE id = 10;
```

MySQL prevents the deletion.

Conceptually:

```text
Department has employees
        ↓
Cannot delete department
```

This is often safer when you don't want accidental cascading deletion.

---

# 13. FOREIGN KEY + ON UPDATE

You can also control what happens when the referenced key changes.

Example:

```sql
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON UPDATE CASCADE
```

If the referenced ID changes, the related foreign keys are updated.

In practice, **primary IDs usually don't change**, so `ON UPDATE CASCADE` is less frequently important than `ON DELETE`.

---

# 14. COMPOSITE KEY ⭐⭐⭐⭐⭐

A composite key contains **multiple columns**.

Example:

```text
student_id
course_id
```

Together they identify one enrollment.

```text
student_id | course_id
-----------+----------
1          | 101
1          | 102
2          | 101
```

Neither column alone necessarily identifies the row.

Together:

```text
(student_id, course_id)
```

does.

---

# 15. Composite PRIMARY KEY ⭐⭐⭐⭐⭐

```sql
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,

    PRIMARY KEY (student_id, course_id)
);
```

Now:

```text
student_id + course_id
        ↓
   unique combination
```

This prevents:

```sql
INSERT INTO enrollments
VALUES (1, 101);

INSERT INTO enrollments
VALUES (1, 101);
```

The second one fails because the combination already exists.

But this is allowed:

```text
(1, 101)
(1, 102)
(2, 101)
```

---

# 16. Composite Primary Key + Foreign Keys ⭐⭐⭐⭐⭐

This is a **very important real-world pattern**.

Suppose:

```text
students
courses
enrollments
```

`enrollments` connects students and courses.

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
```

```sql
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
```

Now:

```sql
CREATE TABLE enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,

    PRIMARY KEY (student_id, course_id),

    FOREIGN KEY (student_id)
        REFERENCES students(id),

    FOREIGN KEY (course_id)
        REFERENCES courses(id)
);
```

This gives us:

```text
students
   │
   │
   ↓
enrollments
   ↑
   │
courses
```

And:

```text
PRIMARY KEY
(student_id, course_id)

+

FOREIGN KEY
student_id → students.id

+

FOREIGN KEY
course_id → courses.id
```

This pattern is extremely important for **many-to-many relationships**.

---

# 17. Composite Key vs UNIQUE Constraint

Very important distinction.

You could also do:

```sql
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,
    course_id INT NOT NULL,

    UNIQUE (student_id, course_id)
);
```

Now:

```text
id
```

is the primary key.

And:

```text
(student_id, course_id)
```

is a unique combination.

This is often preferable when your application wants a simple single-column ID for the enrollment record.

So:

### Option A

```sql
PRIMARY KEY (student_id, course_id)
```

### Option B

```sql
id INT PRIMARY KEY AUTO_INCREMENT,
UNIQUE (student_id, course_id)
```

Both can be valid designs depending on the application.

---

# 18. UNIQUE Constraint ⭐⭐⭐⭐⭐

`UNIQUE` ensures that values don't duplicate.

Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE
);
```

Now:

```text
john@gmail.com
john@gmail.com
```

cannot occur twice in that column.

Very common for:

```text
email
username
phone
employee_code
order_number
```

---

# 19. PRIMARY KEY vs UNIQUE

Remember this:

|              | PRIMARY KEY  | UNIQUE                                      |
| ------------ | ------------ | ------------------------------------------- |
| Uniqueness   | ✅            | ✅                                           |
| NULL allowed | ❌            | Can be, depending on design/MySQL semantics |
| Per table    | One PK       | Multiple UNIQUE constraints                 |
| Main purpose | Row identity | Prevent duplicates                          |

Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(100) UNIQUE
);
```

Perfectly valid.

One primary key:

```text
id
```

Multiple unique constraints:

```text
email
username
```

---

# 20. NOT NULL ⭐⭐⭐⭐⭐

Means:

> This column must have a value.

```sql
name VARCHAR(100) NOT NULL
```

This is one of the most commonly used constraints.

For example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL
);
```

This is a very normal backend table structure.

---

# 21. DEFAULT ⭐⭐⭐⭐⭐

Provides a value when you don't specify one.

```sql
status VARCHAR(20) DEFAULT 'active'
```

Example:

```sql
INSERT INTO users (name, email, password_hash)
VALUES ('Rahul', 'rahul@example.com', 'hashed-password');
```

`status` automatically becomes:

```text
active
```

---

# 22. CHECK ⭐⭐⭐⭐

Used for validation rules.

```sql
age INT CHECK (age >= 18)
```

or:

```sql
salary DECIMAL(10,2)
CHECK (salary >= 0)
```

Example:

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    age INT CHECK (age >= 18),

    salary DECIMAL(10,2)
        CHECK (salary >= 0)
);
```

---

# 23. The Most Common Combination in Real Backend Tables ⭐⭐⭐⭐⭐

You'll frequently see something like:

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'active',

    age INT CHECK (age >= 18)
);
```

Here:

```text
id
├── PRIMARY KEY
└── AUTO_INCREMENT

name
└── NOT NULL

email
├── NOT NULL
└── UNIQUE

password_hash
└── NOT NULL

status
├── NOT NULL
└── DEFAULT

age
└── CHECK
```

This is the kind of combination you should become comfortable reading.

---

# ⭐ Constraint Cheat Sheet

Think of the constraints like this:

```text
PRIMARY KEY
    ↓
Who uniquely identifies this row?

FOREIGN KEY
    ↓
Which row in another table does this belong to?

UNIQUE
    ↓
Can duplicate values exist?

NOT NULL
    ↓
Is this value mandatory?

DEFAULT
    ↓
What value should be used when none is provided?

CHECK
    ↓
What values are allowed?
```

---

# ⭐ What Matters Most For You

If you're preparing for **backend development + interviews**, prioritize them like this:

### MUST MASTER ⭐⭐⭐⭐⭐

```text
PRIMARY KEY
FOREIGN KEY
UNIQUE
NOT NULL
DEFAULT
COMPOSITE PRIMARY KEY
ON DELETE CASCADE
ON DELETE SET NULL
ON DELETE RESTRICT
```

### Important ⭐⭐⭐⭐

```text
CHECK
ON UPDATE CASCADE
Composite UNIQUE
```

### The 3 designs you should be able to create from memory

**1. Normal entity**

```sql
id INT PRIMARY KEY AUTO_INCREMENT
```

**2. Entity with relationship**

```sql
department_id INT NOT NULL,
FOREIGN KEY (department_id)
    REFERENCES departments(id)
```

**3. Many-to-many junction table**

```sql
student_id INT NOT NULL,
course_id INT NOT NULL,

PRIMARY KEY (student_id, course_id),

FOREIGN KEY (student_id)
    REFERENCES students(id),

FOREIGN KEY (course_id)
    REFERENCES courses(id)
```

<!-- If you understand these three patterns deeply, you've covered a **large part of practical SQL constraint design**. -->
