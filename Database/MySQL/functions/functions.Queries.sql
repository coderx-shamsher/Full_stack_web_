show databases;

use testdb;

show tables;

select * from testusers;

-- with mysql functions lets see 
-- first is count() 

select count(*) from testusers;


CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    department VARCHAR(50),
    job_title VARCHAR(80),
    salary DECIMAL(10,2),
    city VARCHAR(50),
    hire_date DATE,
    status VARCHAR(20)
);

select * from employees;

INSERT INTO employees
(id, first_name, last_name, email, age, department, job_title, salary, city, hire_date, status)
VALUES
(1, 'Daniel', 'Kumar', 'daniel.kumar1@example.com', 27, 'Marketing', 'Backend Engineer', 25000, 'Hyderabad', '2026-04-26', 'Active'),
(2, 'James', 'Smith', 'james.smith2@example.com', 34, 'Support', 'Junior Developer', 35000, 'Delhi', '2024-08-15', 'Active'),
(3, 'Karan', 'Brown', 'karan.brown3@example.com', 55, 'Legal', 'Data Analyst', 120000, 'Hyderabad', '2018-04-19', 'On Leave'),
(4, 'Isha', 'Malhotra', 'isha.malhotra4@example.com', 31, 'Marketing', 'Support Engineer', 95000, 'Delhi', '2024-08-10', 'Inactive'),
(5, 'Michael', 'Mishra', 'michael.mishra5@example.com', 27, 'Finance', 'Support Engineer', 75000, 'Hyderabad', '2021-02-12', 'Active'),
(6, 'Aditya', 'Joshi', 'aditya.joshi6@example.com', 23, 'Operations', 'Frontend Engineer', 40000, 'Jaipur', '2022-01-10', 'Inactive'),
(7, 'Emily', 'Reddy', 'emily.reddy7@example.com', 44, 'Support', 'Accountant', 110000, 'Mumbai', '2019-05-27', 'Active'),
(8, 'Pooja', 'Kapoor', 'pooja.kapoor8@example.com', 26, 'Engineering', 'Support Engineer', 135000, 'Hyderabad', '2018-10-12', 'Active'),
(9, 'Noah', 'Malhotra', 'noah.malhotra9@example.com', 44, 'Marketing', 'Product Manager', 40000, 'Chennai', '2022-04-06', 'Inactive'),
(10, 'Rohan', 'Shah', 'rohan.shah10@example.com', 31, 'Marketing', 'Sales Executive', 80000, 'Mumbai', '2020-05-08', 'On Leave'),
(11, 'Sneha', 'Malhotra', 'sneha.malhotra11@example.com', 56, 'Support', 'Project Manager', 50000, 'Chandigarh', '2023-03-09', 'On Leave'),
(12, 'Karan', 'Patel', 'karan.patel12@example.com', 41, 'Engineering', 'Team Lead', 145000, 'Hyderabad', '2026-09-14', 'Active'),
(13, 'Ananya', 'Bansal', 'ananya.bansal13@example.com', 52, 'Product', 'Backend Engineer', 35000, 'Mohali', '2020-05-14', 'On Leave'),
(14, 'Ananya', 'Reddy', 'ananya.reddy14@example.com', 55, 'Finance', 'Data Analyst', 45000, 'Hyderabad', '2020-12-20', 'Active'),
(15, 'Nikhil', 'Wilson', 'nikhil.wilson15@example.com', 53, 'Support', 'Backend Engineer', 90000, 'Mohali', '2024-07-18', 'Active'),
(16, 'Meera', 'Singh', 'meera.singh16@example.com', 48, 'HR', 'Product Manager', 145000, 'Bengaluru', '2018-07-12', 'Active'),
(17, 'Simran', 'Singh', 'simran.singh17@example.com', 56, 'Product', 'Accountant', 85000, 'Chennai', '2022-04-13', 'Active'),
(18, 'Noah', 'Sharma', 'noah.sharma18@example.com', 42, 'HR', 'Support Engineer', 130000, 'Kolkata', '2026-01-31', 'Active'),
(19, 'Arjun', 'Arora', 'arjun.arora19@example.com', 37, 'IT', 'Data Analyst', 90000, 'Delhi', '2019-10-10', 'On Leave'),
(20, 'Riya', 'Mehta', 'riya.mehta20@example.com', 30, 'Marketing', 'Sales Executive', 105000, 'Kolkata', '2019-03-12', 'Active'),
(21, 'Priya', 'Mehta', 'priya.mehta21@example.com', 52, 'Legal', 'Sales Executive', 110000, 'Delhi', '2026-09-25', 'Active'),
(22, 'Aarav', 'Kumar', 'aarav.kumar22@example.com', 26, 'Sales', 'Backend Engineer', 80000, 'Delhi', '2021-06-13', 'Active'),
(23, 'Aditya', 'Iyer', 'aditya.iyer23@example.com', 51, 'Legal', 'Senior Developer', 35000, 'Bengaluru', '2026-07-13', 'On Leave'),
(24, 'Sneha', 'Mehta', 'sneha.mehta24@example.com', 33, 'Product', 'Backend Engineer', 65000, 'Pune', '2023-12-02', 'Active'),
(25, 'Michael', 'Arora', 'michael.arora25@example.com', 49, 'Operations', 'Project Manager', 85000, 'Chennai', '2025-07-14', 'Active'),
(26, 'Arjun', 'Malhotra', 'arjun.malhotra26@example.com', 35, 'Operations', 'Sales Executive', 60000, 'Delhi', '2018-09-20', 'Active');

select * from employees;

select count(*) from employees where status='Active';

select *  from employees where status='Active';


-- as 
select min(salary) as min_salary, max(salary) as max_salary from employees; 

select min(salary) as min_salary, max(salary) as max_salary from employees where department='Engineering';


select sum(salary) as Total_sum from employees;

select avg(salary) as Avg_salary from employees;

select job_title, avg(salary) as Avg_salary from employees group by job_title;

select email, length(email) as Length_of_Email from employees;

select first_name, lower(first_name) as lowernamefirst, last_name , email, length(email) as Length_of_Email from employees;

select first_name, lower(first_name) as lowernamefirst, last_name , email, length(email) as Length_of_Email from employees; 

select email, concat(first_name,' ',last_name) as Username, length(concat(first_name,last_name) ) as length_username from employees;

 select concat(first_name,' ',last_name) as Username, now() as _time_ from employees;
 
  select concat(first_name,' ',last_name) as Username, year(now()) as _time_ from employees;
  
  select concat(first_name,' ',last_name) as Username, month(now()) as _time_ from employees;
  
    select concat(first_name,' ',last_name) as Username, monthname(now()) as _time_ from employees;
    
      select concat(first_name,' ',last_name) as Username, day(now()) as day from employees;
      
      
      -- conditional function if 
      
      select * from employees;
      
      select email, if(department = 'Engineering', 'yes', 'no') as eng from employees;
      
      select concat(first_name,"  ",last_name) as username, if( age <=30 , "yes","no") as age_less_30  from employees;  
      
    