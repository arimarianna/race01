DROP DATABASE IF EXISTS myapp;
CREATE DATABASE myapp;
CREATE USER 'mshcherban'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON myapp.*  TO 'mshcherban'@'localhost';

