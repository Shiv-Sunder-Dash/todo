CREATE DATABASE todo_db;
USE todo_db;
CREATE TABLE todos (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       task TEXT NOT NULL
);