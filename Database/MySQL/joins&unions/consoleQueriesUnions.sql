show databases;

use testdb;

show tables;

-- union and union all

select * from testingusers;
select * from admin_users;

-- union


select username from testingusers
union
select admin_username from admin_users;

select user_id, username from testingusers
union
select admin_id,admin_username from admin_users;

-- sare he usernames ek column mein sum ho kr concate ho kr show hogyi this is union

-- if duplicate data but you want
select username from testingusers
union all
select admin_username from admin_users;

-- jo user table se hai uknki role mein value set hogi user jo admin table se hai to admin set hoga role column mein
select username , 'User' as role from testingusers
union
select admin_username,  'Admin'  from admin_users ;

-- OR -> dono mein se koi bhi use krna yeh vala more readable hai
select username , 'User' as role from testingusers
union
select admin_username,  'Admin' as role from admin_users ;

-- use order by


select username, user_id from testingusers
union
select admin_username, admin_id  from admin_users
order by user_id desc ;


-- rules
   -- the numbers of columns and their data types must match in all select statements
   -- union removes duplicate by default
   -- union all keeps duplicate