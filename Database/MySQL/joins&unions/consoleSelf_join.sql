--  self joins
use testdb;

show tables;

select  * from testusers;

-- 1) step

alter table testusers
add column Referred_by_userid int;

select * from testusers;


-- 2) step

update  testusers
set  Referred_by_userid = 1
where id in (4,6,8,10,12,14);

update  testusers
set  Referred_by_userid = 2
where id in (3,5,7,11,13,15);

select *
from testusers;

-- now see jis user ne like user john ko user 2 userid value user ne referer kra hai but ager userid ki jagah par username hota to data aur easy to read and analysis mein easy hota...


select
    a.id,
    a.first_name AS username,
    b.first_name AS Referred_by_name
from
    testusers a
inner join
         testusers b on a.Referred_by_userid = b.id;

-- left join mien null values bhi show hongi
select
    a.id,
    a.first_name AS username,
    b.first_name AS Referred_by_name
from
    testusers a
left join
         testusers b on a.Referred_by_userid = b.id;


