use fileStorage;

CREATE TABLE IF NOT EXISTS files (
    file_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(127) NOT NULL,
    size_bytes BIGINT UNSIGNED NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (file_id),
    UNIQUE KEY uq_files_stored_name (stored_name),
    KEY idx_files_created_at (created_at)
);
