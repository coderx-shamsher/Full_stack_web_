-- Inserting data into table 

select * from Admins;

-- removing (droping column) column 
alter table Admins drop column created_at;

Insert into Admins Values
-- ('adminx','adminx@gmail.com',true),
(2,'useradmin','useradmin@gmail.com',false),
(3,'bobadm','admbob@gmail.com',true),
(4,'adminx0x','admin0x@gmail.com',true),
(5,'adminz','adminx@gmail.com',true),
(6,'adminy','adminx@gmail.com',true),
(7,'admintesting','admintesting@gmail.com',true);

-- baki values ko , se seperate krna hai aur last ko ; se end krni hai query 

select * from Admins;

