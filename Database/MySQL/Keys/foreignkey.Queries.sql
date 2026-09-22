
show tables;

select * FROM testusers;

-- now man lo mere ek table hai jo ki users table hai aur ek orders tables hai , main chaahta hun ki main mere user table ki ek id se uss user k order details ko get kr sakun .. ! like that 

drop Table address;

-- create a table 

CREATE TABLE address(
  /* addressId INT AUTO_INCREMENT PRIMARY KEY, */
   AddressId INT ,
   country_name VARCHAR(100) NOT NULL,
   city_name VARCHAR(100) NOT NULL,
   streetNo INT,

   CONSTRAINT fkey_userid FOREIGN KEY (AddressId) REFERENCES  users(userId)
   -- mera userId reference kr raha hai testusers userId column ko 
   ON DELETE CASCADE  -- ager testusers k id ko yan user ko he detele kr diya hai to mere address table se bhi delete hoga 

);

-- set the starting auto increament values -> 
/* ALTER Table address AUTO_INCREMENT=1000 */


SELECT * from address; 

SELECT COUNT(*) FROM testusers;

--SELECT * FROM testusers;

/* DELETE from address; */


CREATE Table Users(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    age INT ,
    status VARCHAR(20) DEFAULT 'inactive'
);

ALTER Table users AUTO_INCREMENT=104;

INSERT INTO Users (username, age, status) VALUES 
('john_doe', 28, 'active'),
('anna_smith', 34, 'active'),
('hiroshi_t', 22, 'inactive'),
('emily_watson', 45, 'active'),
('liam_neeson', 50, 'active'),
('carlos_b', 31, 'inactive'),
('zola_m', 29, 'active'),
('aarav_sharma', 26, 'active'),
('sarah_j', 41, 'active'),
('jack_manc', 19, 'inactive'),
('zayed_al', 33, 'active'),
('chong_wei', 27, 'active'),
('sven_v', 38, 'active'),
('elena_m', 24, 'inactive'),
('giovanni_r', 53, 'active'),
('sofia_g', 30, 'active'),
('diego_mar', 47, 'active'),
('min_ho', 25, 'inactive'),
('kiwi_dan', 36, 'active'),
('amr_diab', 42, 'active'),
('tarkan_s', 39, 'active'),
('somchai_p', 23, 'inactive'),
('nguyen_v', 28, 'active'),
('haris_m', 35, 'active'),
('conor_o', 32, 'active'),
('bjorn_b', 44, 'inactive'),
('olav_h', 51, 'active'),
('frederik_d', 29, 'active'),
('beat_z', 48, 'active'),
('franz_k', 37, 'inactive'),
('luc_b', 40, 'active'),
('nikos_p', 31, 'active'),
('joao_s', 26, 'active'),
('kamil_n', 33, 'inactive'),
('maria_s', 22, 'active'),
('budi_h', 45, 'active'),
('alejandro_c', 34, 'active'),
('juan_p', 27, 'inactive'),
('miguel_l', 29, 'active'),
('fahad_a', 36, 'active');


SELECT * FROM users;

INSERT INTO address (`AddressId`,country_name,city_name,`streetNo`) VALUES
(104, 'France', 'Paris', 18),
(105, 'Germany', 'Berlin', 55),
(106, 'Japan', 'Tokyo', 301),
(107, 'Australia', 'Sydney', 14),
(108, 'Canada', 'Toronto', 89),
(109, 'Brazil', 'São Paulo', 420),
(110, 'South Africa', 'Cape Town', 33),
(111, 'India', 'Mumbai', 105),
(112, 'United States', 'Los Angeles', 742),
(113, 'United Kingdom', 'Manchester', 11),
(114, 'United Arab Emirates', 'Dubai', 210),
(115, 'Singapore', 'Singapore', 5),
(116, 'Netherlands', 'Amsterdam', 99),
(117, 'Spain', 'Madrid', 64),
(118, 'Italy', 'Rome', 27),
(119, 'Mexico', 'Mexico City', 888),
(120, 'Argentina', 'Buenos Aires', 142),
(121, 'South Korea', 'Seoul', 50),
(122, 'New Zealand', 'Auckland', 19),
(123, 'Egypt', 'Cairo', 304),
(124, 'Turkey', 'Istanbul', 73),
(125, 'Thailand', 'Bangkok', 15),
(126, 'Vietnam', 'Ho Chi Minh City', 92),
(127, 'Malaysia', 'Kuala Lumpur', 404),
(128, 'Ireland', 'Dublin', 8),
(129, 'Sweden', 'Stockholm', 112),
(130, 'Norway', 'Oslo', 46),
(130, 'Norway', 'Oslo', 46),
(131, 'Denmark', 'Copenhagen', 23),
(132, 'Switzerland', 'Zurich', 57),
(133, 'Austria', 'Vienna', 19),
(134, 'Belgium', 'Brussels', 80),
(135, 'Greece', 'Athens', 302),
(136, 'Portugal', 'Lisbon', 45),
(137, 'Poland', 'Warsaw', 12),
(138, 'Philippines', 'Manila', 67),
(139, 'Indonesia', 'Jakarta', 555),
(140, 'Chile', 'Santiago', 81),
(141, 'Colombia', 'Bogotá', 29),
(142, 'Peru', 'Lima', 14),
(143, 'Saudi Arabia', 'Riyadh', 90);


SELECT * FROM address;

SELECT * FROM users;


-- now we can 