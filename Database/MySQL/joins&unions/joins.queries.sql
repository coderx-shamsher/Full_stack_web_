
use testdb;

show tables;

-- joins  in sql

-- inner join -- return the matching rows from both tables

select *
from users;

select *
from address;


select users.username, address.city_name
from users
inner  join address on users.userId = address.AddressId;

-- table mein ke new format show hoga jismein hota usename and city_name


-- this table make more sense
select users.userId,users.username,address.country_name, address.city_name
from users
inner  join address on users.userId = address.AddressId;

-- ager kisi column name duplicate hai yan toh ham use result mein show krte time change kr skte hian with AS
select users.userId,users.username,address.AddressId AS address_Id , address.country_name, address.city_name
from users
inner  join address on users.userId = address.AddressId;

-- so this is inner join -> only matching pairs
-- means inner join k liye hame dono tables mein koi same column hona chaahie ! like userid, addressid etc ...

-- ----> Left join
-- > letf table de sare records milte hain yeh priority hai right value table se miss honge to null milega lets se

select users.userId,users.username,address.country_name, address.city_name
from users
left  join address on users.userId = address.AddressId;

-- mere 104 user ki country name or city name missing hai toh null show hoga
select * from users;

select users.userId,users.username,address.country_name, address.city_name
from users
right  join address on users.userId = address.AddressId;


# ---->>>> Testing joins without foregin key setup
-- creating testing table

drop table  testing ;
drop table  testingAddress ;

create table testing(
    userid varchar(30) primary key,
    username varchar(29)
);

create  table  testingAddress(
    addressId int auto_increment primary key ,
    id varchar(30) ,
    country_name varchar(30),
    city_name varchar(30)
);

select *
from  testing;

select *
from testingAddress;

insert into
      testing(userid, username)
VALUES
    ('user1','bob'),
    ('user2','max'),
    ('user3','rohan'),
    ('user4','shruti'),
    ('user5','mansi'),
    ('user6','manda');

insert into
      testingAddress(id, country_name, city_name)
VALUES
      ('user1','india','delhi'),
      ('user2','usa','los Angeles'),
      ('user3','india','delhi'),
      ('user4','japan','tokyo'),
      ('user5','india','mumbai'),
      ('user6','canada','toronto');

select * from testing;
select * from testingAddress;

-- ## INNER join
select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
inner join testingAddress on testing.userid = testingAddress.id;

-- ## Left join
select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
left join testingAddress on testing.userid = testingAddress.id;

-- ## Right Join
select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
right join testingAddress on testing.userid = testingAddress.id;

-- this is becuase hamne foregin key setup nhi kri ??

-- let see ager ham foregin key setup krden


alter table
    testingAddress
    add constraint  fk_user
    foreign key (id) references testing(userid);

# update testingAddress
# set add_id = 'user1'
# where add_id is null ;
#
# alter table
# testingAddress
# add column add_id varchar(30);

select *
from testing;
select *
from testingAddress;

-- now lets see joins work behavior

-- ## INNER join
select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
inner join testingAddress on testing.userid = testingAddress.id;


select * from
           testingAddress
where addressId = 1;

delete from
           testingAddress
where addressId = 1;

select * from testingAddress;


-- ## Left join
select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
left join testingAddress on testing.userid = testingAddress.id;

-- ## Right Join

select testing.userid, testing.username, testingAddress.country_name, testingAddress.city_name
from testing
right join testingAddress on testing.userid = testingAddress.id;


