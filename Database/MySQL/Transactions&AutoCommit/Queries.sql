
show DATABASES;

show TABLES in mysqladmin;

USE mysqladmin;

SELECT * FROM users;

--- first set auto commit 

SET autocommit = 0;  

select COUNT(*) from users; 

COMMIT  -- for verfiy the changes 

select * FROM users; 

DELETE from users WHERE id=8 ;  -- now your mistake in deletion ,!! ? what to do now ?? 

ROLLBACK;  -- back to previous commit  

SELECT * FROM users; --- now see k ham vapis rollback ho chuke hain !! 

--- let test one more time 

DELETE from users where id=10; 

SELECT * FROM users; -- now kiya changes permanent hai ?? nhi hamne autocommit off kra hai ham 

--- from no hamare pass do options hai 
--- 1) ager operations shi hai after confirming ! hamne check kr liya hai to ! hamm changes ko commit kr skte hain ! 

--- COMMIT

--- 2) ager opertions mein kuch garbar hai to ham check kr skte hain or rollback kr skte hain 

--- ROLLBACK 


