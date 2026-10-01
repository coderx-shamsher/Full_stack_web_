CREATE TABLE project_members (
    project_id INT NOT NULL,

    user_id INT NOT NULL,

    role ENUM('owner', 'member') DEFAULT 'member',

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (project_id, user_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(projectId)
        ON DELETE CASCADE,

    FOREIGN KEY (user_id)
        REFERENCES users(userId)
        ON DELETE CASCADE
);