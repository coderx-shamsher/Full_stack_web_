show databases;

use testdb;

show tables;


-- union and union all

drop table testingusers;
drop table admin_users;

-- Create the main Users table
CREATE TABLE testingusers
(
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    status        VARCHAR(20) DEFAULT 'active'
);

-- Create the Admin Users table
CREATE TABLE admin_users
(
    admin_id          INT AUTO_INCREMENT PRIMARY KEY,
    admin_username    varchar(40) default 'adminUser',
    admin_role        VARCHAR(50) DEFAULT 'administrator',
    permissions_level INT         DEFAULT 1,
    assigned_at       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

select *
from testingusers;

select *
from admin_users;


INSERT INTO testdb.testingusers (username, email, password_hash, status) VALUES
('john_doe', 'john.doe@example.com', '$2y$10$e0myZ3...hash...', 'active'),
('jane_smith', 'jane.smith@example.com', '$2y$10$x7HzQ...hash...', 'active'),
('alice_admin', 'alice.adm@example.com', '$2y$10$pL9xM...hash...', 'active'),
('bob_super', 'bob.super@example.com', '$2y$10$wK2sN...hash...', 'active'),
('charlie_support', 'charlie.s@example.com', '$2y$10$qR5tY...hash...', 'active'),
('dana_manager', 'dana.m@example.com', '$2y$10$zX9vB...hash...', 'active'),
('evan_analyst', 'evan.a@example.com', '$2y$10$mL2nK...hash...', 'active'),
('fiona_security', 'fiona.s@example.com', '$2y$10$pP7oI...hash...', 'active');

INSERT INTO admin_users (admin_username,admin_role, permissions_level) VALUES
('bob','moderator', 2),
('nina','super_admin', 3),
('steve','support_tier_2', 1),
('melo','content_manager', 2),
('thorfin','data_analyst', 1),
('max','security_auditor', 3);
