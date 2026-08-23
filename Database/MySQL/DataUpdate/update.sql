
SHOW DATABASES;


USE mysqladmin;


SHOW TABLES; 


SELECT * FROM admins;


## adding columns 
ALTER TABLE admins ADD COLUMN Age INT NOT NULL;

## update age 
UPDATE admins SET `Age` = 19 ; 

-- without where k ager ham update use krte hain to sare  he rows update hoti hai jo ki not a professional way

SELECT * FROM admins;

UPDATE admins SET `IsActive` = FALSE, `Age` = 18 WHERE id = 1;
UPDATE admins SET `IsActive` = FALSE, `Age` = 17 WHERE id = 3;
UPDATE admins SET `IsActive` = FALSE, `Age` = 18 WHERE id = 5;
UPDATE admins SET `IsActive` = FALSE, `Age` = 17 WHERE id = 7;

## updating gmail using the id 
UPDATE admins SET `Email` = "adminy6@gmail.com" WHERE id = 6;

SELECT * FROM admins;


 -- make sure k where k bina koi bhi update queries run malt kro
 



