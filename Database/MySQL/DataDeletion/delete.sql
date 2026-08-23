SHOW TABLES;

-- lets create one new testdb 

CREATE DATABASE testdb;

SHOW DATABASES;


USE testdb;


SHOW TABLES;


CREATE TABLE TestUsers(
     id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

SELECT * FROM TestUsers;


INSERT INTO TestUsers (first_name, last_name, email, password_hash, status, created_at) VALUES
('James', 'Smith', 'james.smith@example.com', '$2y$10$e0MYzXyDx', 'active', '2026-01-15 10:00:00'),
('Mary', 'Johnson', 'mary.j@example.com', '$2y$10$vfZ1xBA64', 'active', '2026-01-16 11:20:00'),
('John', 'Williams', 'john.w@example.com', '$2y$10$7R9rK8zPl', 'inactive', '2026-01-18 09:15:00'),
('Patricia', 'Brown', 'patricia.b@example.com', '$2y$10$UoW5tMxNe', 'active', '2026-01-20 14:45:00'),
('Robert', 'Jones', 'robert.j@example.com', '$2y$10$QwE3rTyUi', 'active', '2026-01-22 16:30:00'),
('Jennifer', 'Garcia', 'jennifer.g@example.com', '$2y$10$AsDfGhJkl', 'suspended', '2026-01-25 08:00:00'),
('Michael', 'Miller', 'michael.m@example.com', '$2y$10$ZxCvBnM12', 'active', '2026-01-26 12:10:00'),
('Linda', 'Davis', 'linda.d@example.com', '$2y$10$PoIuYtReW', 'active', '2026-01-28 17:05:00'),
('William', 'Rodriguez', 'william.r@example.com', '$2y$10$LkJhGfDsA', 'inactive', '2026-02-01 10:55:00'),
('Elizabeth', 'Martinez', 'elizabeth.m@example.com', '$2y$10$MnBvCxZ34', 'active', '2026-02-03 13:40:00'),
('David', 'Hernandez', 'david.h@example.com', '$2y$10$1q2w3e4r5', 'active', '2026-02-05 15:25:00'),
('Barbara', 'Lopez', 'barbara.l@example.com', '$2y$10$6t7y8u9i0', 'active', '2026-02-08 11:15:00'),
('Richard', 'Gonzalez', 'richard.g@example.com', '$2y$10$0p9o8i7u6', 'suspended', '2026-02-10 14:20:00'),
('Susan', 'Wilson', 'susan.w@example.com', '$2y$10$a1s2d3f4g', 'active', '2026-02-12 09:00:00'),
('Joseph', 'Anderson', 'joseph.a@example.com', '$2y$10$z1x2c3v4b', 'active', '2026-02-14 18:35:00'),
('Jessica', 'Thomas', 'jessica.t@example.com', '2y$10$qAzWsExEd', 'inactive', '2026-02-15 10:45:00'),
('Thomas', 'Taylor', 'thomas.t@example.com', '$2y$10$rFvTgByHn', 'active', '2026-02-17 11:50:00'),
('Sarah', 'Moore', 'sarah.m@example.com', '$2y$10$uJmKiLoP1', 'active', '2026-02-19 16:10:00'),
('Charles', 'Jackson', 'charles.j@example.com', '$2y$10$7x8c9v0b1', 'active', '2026-02-21 07:30:00'),
('Karen', 'Martin', 'karen.m@example.com', '$2y$10$4s5d6f7g8', 'active', '2026-02-22 13:15:00'),
('Christopher', 'Lee', 'christopher.l@example.com', '$2y$10$9s8d7f6g5', 'active', '2026-02-24 09:30:00'),
('Lisa', 'Perez', 'lisa.p@example.com', '$2y$10$1a2s3d4f5', 'active', '2026-02-25 14:15:00'),
('Daniel', 'Thompson', 'daniel.t@example.com', '$2y$10$p0o9i8u7y', 'inactive', '2026-02-27 11:10:00'),
('Nancy', 'White', 'nancy.w@example.com', '$2y$10$m1n2b3v4c', 'active', '2026-03-01 08:45:00'),
('Matthew', 'Harris', 'matthew.h@example.com', '$2y$10$q1w2e3r4t', 'active', '2026-03-02 16:20:00'),
('Betty', 'Sanchez', 'betty.s@example.com', '$2y$10$z5x4c3v2b', 'suspended', '2026-03-04 10:05:00'),
('Anthony', 'Clark', 'anthony.c@example.com', '$2y$10$l9k8j7h6g', 'active', '2026-03-06 13:50:00'),
('Sandra', 'Ramirez', 'sandra.r@example.com', '$2y$10$a5s4d3f2g', 'active', '2026-03-08 12:15:00'),
('Mark', 'Lewis', 'mark.l@example.com', '$2y$10$t9y8u7i6o', 'inactive', '2026-03-10 15:40:00'),
('Ashley', 'Robinson', 'ashley.r@example.com', '$2y$10$e5r4t3y2u', 'active', '2026-03-11 09:25:00'),
('Donald', 'Walker', 'donald.w@example.com', '$2y$10$w9e8r7t6y', 'active', '2026-03-13 17:10:00'),
('Kimberly', 'Young', 'kimberly.y@example.com', '$2y$10$i9o8p7u6y', 'active', '2026-03-15 11:35:00'),
('Steven', 'Allen', 'steven.a@example.com', '$2y$10$x1c2v3b4n', 'suspended', '2026-03-17 14:00:00'),
('Emily', 'King', 'emily.k@example.com', '$2y$10$asdfghj12', 'active', '2026-03-19 10:50:00'),
('Paul', 'Wright', 'paul.w@example.com', '$2y$10$qwertyu34', 'active', '2026-03-22 08:15:00'),
('Donna', 'Scott', 'donna.s@example.com', '$2y$10$zxcvbnm56', 'inactive', '2026-03-24 16:30:00'),
('Andrew', 'Torres', 'andrew.t@example.com', '$2y$10$mnbvcxz78', 'active', '2026-03-25 12:05:00'),
('Michelle', 'Nguyen', 'michelle.n@example.com', '$2y$10$poiuytr90', 'active', '2026-03-27 15:20:00'),
('Joshua', 'Hill', 'joshua.h@example.com', '$2y$10$lkjhgfd11', 'active', '2026-03-29 09:40:00'),
('Carol', 'Flores', 'carol.f@example.com', '$2y$10$mnbvcxz22', 'active', '2026-03-31 13:10:00');


SELECT * FROM TestUsers;


-- lets checkout 

SELECT  id, first_name,status FROM TestUsers WHERE STATUS="suspended";

DELETE FROM TestUsers WHERE id=6 ;
DELETE FROM TestUsers WHERE first_name="Richard" ;


SELECT * FROM TestUsers; 

