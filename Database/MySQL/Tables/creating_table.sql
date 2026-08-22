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

-- Renaming table names 
/* 
  syntax ->\
  
   rename table <yourtablename> to <NewTableName> 
 
*/
rename table users to Admins;


select * from users; -- this query now not working, keoki hamne table k name rename krdiya hai 


select * from Admins;



