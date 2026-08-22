## Altering Tables 

```sql

-- using db 

use mysqladmin;

-- Renaming table names 
/* 
  syntax ->\
  
   rename table <yourtablename> to <NewTableName> 
 
*/
rename table users to Admins;


select * from users; -- this query now not working, keoki hamne table k name rename krdiya hai 


select * from Admins;

/*
  alter tables 
    
  
  -- alter columns (adding new columns into table) 
  alter table Tablename add column ColumnName Datatype Constraints; 
  
  -- (we can add more constraints) 
  
  -- alter drop columns 
  alter table TableName Drop column ColumnName;

 -- for modification of column datatypes 
 Alter Table <Admins> Modify Column <columnName> DataType (example -> varchar(200) ) ;

-- changing the position of the columns (columns ko age peche krna 😅 ) 
Alter Table Admins Modify Column Email VarChar(200) After name ;

-- jis column ko change kr rahe ho examples email to uska data type bhi dsna pardta hai ager constraints add krne ho to vo bhi add kr skte ho... 

Alter Table Admins Modify Column Email VarChar(200) not null  After name ;

*/

Select * From Admins;

-- for adding columns
Alter Table Admins Add Column IsActive  Boolean Default True;

Alter Table Admins Add Column Email  VarChar(100);

-- for modification of column datatypes 
Alter Table Admins Modify Column Email VarChar(200);

-- for droping columns 
Alter Table Admins Drop Column IsActive; 

-- changing the position of the columns (columns ko age peche krna 😅 ) 
Alter Table Admins Modify Column Email VarChar(200) not null  After name ;

select * From Admins;




```
