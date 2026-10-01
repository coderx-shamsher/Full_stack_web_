CREATE TABLE tasks (
    taskId INT PRIMARY KEY AUTO_INCREMENT,

    project_id INT NOT NULL,

    assigned_to INT,

    created_by INT NOT NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    status ENUM('todo', 'in_progress', 'completed')
        DEFAULT 'todo',

    priority ENUM('low', 'medium', 'high', 'urgent')
        DEFAULT 'medium',

    due_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id)
        REFERENCES projects(projectId)
        ON DELETE CASCADE,

    FOREIGN KEY (assigned_to)
        REFERENCES users(userId)
        ON DELETE SET NULL,

    FOREIGN KEY (created_by)
        REFERENCES users(userId)
);