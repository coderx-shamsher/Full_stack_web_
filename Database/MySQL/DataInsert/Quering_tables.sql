-- Quering data from table 

-- create a new table 


CREATE TABLE Users(
  
   Id Int auto_increment Primary Key,
   Name VarChar(50) not null, 
   Email VarChar(50) not null unique,
   Gender ENUM("Male","Female","Other"),
   Age Int not null
   
);

select * from Users;

-- Insert data 

INSERT INTO Users VALUES
(1,'alex','alex@gmail.com','Male',19),
(2,'bob','bob@gmail.com','Male',18),
(3,'rahul','rahul@gmail.com','Male',16),
(4,'reeta','reeta@gmail.com','Female',20),
(5,'max','max@gmail.com','Male',16),
(6,'rohan','rohan@gmail.com','Female',17),
(7,'neha','neha@gmail.com','Female',16),
(8,'sneha','sneha@gmail.com','Female',19),
(9,'marry','marry@gmail.com','Female',16),
(10,'nisha','nisha@gmail.com','Female',18),
(11,'jashan','jashan@gmail.com','Male',17),
(12,'taniya','taniya@gmail.com','Female',17),
(13,'rohani','rohani@gmail.com','Female',18),
(14,'chahat','chahat@gmail.com','Female',18),
(15,'maniya','maniya@gmail.com','Female',17),
(16, 'amuliya','amuliya@gmail.com','Female',19),
(17, 'rupinder','rupinder@gmail.com','Female',18),
(18, 'payal','payal@gmail.com','Female',19),
(19, 'preeti','preeti@gmail.com','Female',17),
(20, 'aren','aren@gmail.com','Male',17),
(21, 'john','john@gmail.com','Male',18),
(22, 'joy','joy@gmail.com','Male',18),
(23, 'marleen','marleen@gmail.com','Female',18),
(24, 'miste','miste@gmail.com','Female',18),
(25, 'kora','kora@gmail.com','Female',17),
(26, 'jeena','jeena@gmail.com','Female',18),
(27, 'maxten','maxten@gmail.com','Male',16),
(28, 'beth','beth@gmail.com','Female',18);


SELECT * FROM users;

SHOW FULL TABLES;

## -->> Data Retrieving Queries -->> 
## using where 

SELECT * FROM users WHERE `Gender`="Male";
SELECT * FROM users WHERE Gender="Female";
SELECT * FROM users WHERE Gender<>"female";
SELECT * FROM users WHERE `Age`<>16;
SELECT * FROM users WHERE `Age`<>17;
 
/* ager not use krna hai to <> this operator  */

## less then < and greater than also use >= or <= 
SELECT * FROM users WHERE Age<18;


## between 

SELECT * FROM users WHERE `Age` BETWEEN 16 AND 17 ;


## in with ()
SELECT * FROM users WHERE `Gender` in ('Male'); 

## using AND 
SELECT * FROM users WHERE `Gender`="Female" AND `Age`=17;

## using OR 
SELECT * FROM users WHERE Age=18 OR `Gender`="Male";

## --> sorting tables ---> 
SELECT * FROM users ORDER BY `Name` DESC ;  # z-a 

SELECT * FROM users ORDER BY `Name` ASC ;  # a-z 

## using AS 
SELECT Name AS "UserName" FROM users;