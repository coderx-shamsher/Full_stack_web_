CREATE TABLE projects(
     projectId int PRIMARY KEY AUTO_INCREMENT,

     ownerId INT NOT NULL,

     projectName VARCHAR(300) NOT NULL,

     description TEXT,

     projectStatus ENUM('onGoing','completed','canceled')
       DEFAULT 'onGoing',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    --- create f-key
    CONSTRAINT fkey_projects_owner
      Foreign Key (ownerId) REFERENCES users(userId)


);