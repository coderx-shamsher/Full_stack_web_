SHOW DATABASES;


CREATE DATABASE testsql;


SHOW TABLES IN testsql ;



CREATE TABLE data(
    id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE

);

/* 
  1)  maine ek table create kiya. 
    2) jismein maine do columns create kiye hain jinmein maine constraints use kiye hain -> 
        primary key  -> in id column means id mera ke primary key column hai 

        unique -> main mere name column nu unique constraint set kita hai jo ki mere table wich koi bhi duplicate name store nhi hone devega.. 

        let test it.. 
    
*/


SELECT * FROM `data`;


-- insert data 
INSERT INTO `data`(id,name) VALUES
(101,'joe'),
(102,'marsh'),
(103,'cozy'),
(104,'sakura'),
(105,'marteen'),
(106,'lee'),
(107,'choji'),
(108,'goza'),
(109,'max'),
(110,'maxten'),
(111,'john'),
(112,'stan');

-- see the duplicate values are not allowed ! change it then code is worked 

SELECT * FROM `data`;


/* Not null constraint 
-> ager not null constraint lagah hai to koi bhi column ki value empty nhi ho skti its useful mostly
-> ager ham upar value code mein dyanse check kre to yeh nhi hai means lets try empty data insertion
*/

INSERT INTO `data` VALUES
(112),
(232),
(334);


SELECT * FROM `data`;
-- can you see 

-- HOw to add constraints ? -> 
# using alter table add constraint (we can give name to that constraint) constraint(unique etc) (columnName in this parenthese)

-- ALTER Table `data` ADD CONSTRAINT not_null_id  NOT NULL (id);

ALTER Table `data` MODIFY id INT NOT NULL ; 
ALTER Table `data` MODIFY name VARCHAR(50) NOT NULL ; 

SELECT * FROM `data`; 

INSERT INTO `data` VALUES
(14),
(15); 

-- 


CREATE TABLE testdata(
    id INT,
    name VARCHAR(50)
);

SELECT * FROM testdata;

INSERT INTO testdata VALUES
(NULL,'Null'), 
(NULL,'Null'), 
(NULL,'Null'), 
(NULL,'Null'), 
(NULL,'Null'), 
(NULL,'Null'),
(NULL,'Null'); 

SELECT * FROM testdata;

-- lets fix this 

-- delte data 
DELETE FROM testdata id; 
DELETE FROM testdata name; 


SELECT * FROM testdata;
-- adding constraints 
ALTER TABLE testdata MODIFY COLUMN id INT NOT NULL;
ALTER TABLE testdata MODIFY name VARCHAR(50) NOT NULL UNIQUE;

-- now we cannot add null values and duplicate values 
INSERT INTO testdata VALUES
(101,'Null1'), 
(102,'Null2'), 
(103,'Null3'), 
(104,'Null34'), 
(105,'Null4'), 
(106,'Null5'),
(107,'Null6'); 

--- jab tak ham constraints k rules ko follow nhi krte tab tak data nhi insert hoga..


-- important check constraints 

ALTER TABLE testdata ADD constraint UNIQUE _diffId_ (id); 
INSERT INTO testdata VALUES
(101,'Null11'), 
(102,'Null20'), 
(103,'Null33'); 


ALTER TABLE testdata ADD COLUMN age INT ; 

ALTER Table testdata add constraint check_age  CHECK(age > 0);

-- deleting this constraint
ALTER TABLE testdata DROP check check_age;

SELECT * FROM testdata WHERE age is NULL; 

ALTER Table testdata add constraint check_age  CHECK(age > 20);

INSERT INTO testdata
VALUES
/* (10,'admin',10),
(12,'adminx',12); */
(10,'admin',21),
(12,'adminx',22);  -- this works keoki constraint rule follow kiya and data insert ho gya 


-- auto increment and default constraint 

CREATE Table devs(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(40) DEFAULT 'testdev'
);

-- default constraint us par lago jo value hame add nhi kri but hame chaahie like timestamp etc 


/* DROP Table devs; */

INSERT INTO devs VALUES
('anme'),
('hero'),
('zzeo');

SELECT * FROM devs;