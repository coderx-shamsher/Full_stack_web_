## Create new Database mysql 

> **First cerate new database**

```sql 

create database mysqladmin;


```
-> run this and see the ouput section 

> **now set this database to use**

```sql

use mysqladmin;

```
> *run this line setup this db to work withh* 

--- 


## create tables 
*create a table using the CREATE TABLE statement. This method requires specifying the table name, column names, and their data types.*

> Syntax:
```
CREATE TABLE table_name (
    column1_name datatype constraints,
    column2_name datatype constraints,
    ...
    columnN_name datatype constraints
);

```
- column_name: This is the name of each column in the table.
- datatype: This is the data type of the column (e.g., INT, VARCHAR, DATE, etc.).
- constraints: These are optional and define rules for the data in the column, such as NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, etc.

---

```sql

## creating table with --> 
-- syntax is this 
-- create table tablename()


create table users(
    
    id int auto_increment primary key,
    
    name varchar(100) not null,
    
    created_at timestamp default current_timestamp
  );
  
  
# let see table columns structure with this query 
select * from users;

-- this query for specific columns searching  
select name, id from users;


```


---


