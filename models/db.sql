DROP DATABASE IF EXISTS myapp;
CREATE DATABASE myapp;
CREATE USER 'mshcherban'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON * . *  TO 'mshcherban'@'localhost';

-- dont run in code just in workbench
-- CREATE DATABASE IF NOT EXISTS myapp;
-- CREATE USER IF NOT EXISTS 'mshcherban'@'localhost' IDENTIFIED BY 'securepass';
-- GRANT ALL PRIVILEGES ON * . * TO 'mshcherban'@'localhost';
-- ALTER USER 'mshcherban'@'localhost' IDENTIFIED WITH mysql_native_password BY 'securepass';
-- flush privileges;