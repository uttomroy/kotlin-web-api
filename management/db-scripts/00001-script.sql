-- Create database
CREATE DATABASE management;

-- Connect to the management database
\c management

-- Create the "user" table
CREATE TABLE "user" (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a row into the "user" table
INSERT INTO "user" (username, email, created_at)
VALUES ('john_doe', 'john.doe@example.com', CURRENT_TIMESTAMP);