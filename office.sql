DROP DATABASE IF EXISTS playlistDB;
CREATE DATABASE playlistDB;

USE playlistDB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (title)
VALUES ("HR");

INSERT INTO department (title)
VALUES ("Accounting");

INSERT INTO department (title)
VALUES ("Sales");

INSERT INTO department (title)
VALUES ("Reception");

CREATE TABLE IF NOT EXISTS role (
	id INT AUTO_INCREMENT NOT NULL,
	job_title VARCHAR(30) NOT NULL,
    salary INT (50) NOT NULL,
	department_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(department_id) REFERENCES department(id),
    
);

INSERT INTO department (name) VALUES ("HR"), ("Accounting"), ("Sales");
INSERT INTO
	role (job_title, salary, house_id)
VALUES
	("HR lead", 60,000 , 1),
    ("Accounting Lead", 70,000 , 2),
    ("Sales lead", 50,000, 3);
SELECT * FROM department;
SELECT * FROM role;
SELECT
	CONCAT(w.job_title, ' ', salary) AS role,
    d.name AS department,
   
FROM department AS d
INNER JOIN role AS r
on d.id = r.department_id;
    



