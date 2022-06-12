CREATE DATABASE IF NOT EXISTS myapp;

use myapp;

CREATE TABLE IF NOT EXISTS users(
    id INT not null AUTO_INCREMENT,
    login CHAR(32) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password CHAR(255),
    PRIMARY KEY (id)
);
