CREATE TABLE users(
   
    userId INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(200) NOT NULL,

    userEmail VARCHAR(300) UNIQUE NOT NULL,

    password VARCHAR(500) NOT NULL,

    role ENUM('user', 'admin') DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON 
      UPDATE CURRENT_TIMESTAMP

);