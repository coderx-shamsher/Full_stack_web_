CREATE TABLE project_members (
    project_id INT NOT NULL,

    memberId INT NOT NULL,

    role ENUM('owner', 'member') DEFAULT 'member',

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (project_id, memberId),

    FOREIGN KEY (project_id)
        REFERENCES projects(projectId)
        ON DELETE CASCADE,

    FOREIGN KEY (memberId)
        REFERENCES users(userId)
        ON DELETE CASCADE
);