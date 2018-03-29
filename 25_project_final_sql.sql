/* Drop database */

DROP DATABASE if exists furriends;

/* Create database */
CREATE DATABASE furriends;
USE furriends;

/* Create user with all privileges */

CREATE USER IF not exists 'user'@'localhost';
GRANT ALL PRIVILEGES ON * TO 'user'@'localhost' IDENTIFIED BY 'password';

/* Create tables */

CREATE TABLE Species(
species_id INT AUTO_INCREMENT,
name VARCHAR(190),
breed VARCHAR(190),
fee INT,
type VARCHAR(190),
PRIMARY KEY (species_id),
UNIQUE (name, breed));

CREATE TABLE Location(
location_id INT AUTO_INCREMENT,
address VARCHAR(190),
city VARCHAR(190),
PRIMARY KEY (location_id),
UNIQUE (address, city));

CREATE TABLE Animal(
animal_id INT AUTO_INCREMENT,
birthdate DATE,
sex CHAR,
intake_date DATE,
special_needs VARCHAR(190),
weight INT,
name VARCHAR(190),
img_url VARCHAR(190),
species_id INT NOT NULL,
location_id INT NOT NULL,
PRIMARY KEY (animal_id),
CHECK (sex = 'f' OR sex = 'm'),
CHECK (weight > 0 AND weight < 300),
FOREIGN KEY (species_id) REFERENCES Species(species_id) ON DELETE NO ACTION ON UPDATE CASCADE,
FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE NO ACTION ON UPDATE CASCADE); 

CREATE TABLE Applicant(
applicant_id INT AUTO_INCREMENT,
email VARCHAR(190),
name VARCHAR(190),
phone VARCHAR(190),
location_id INT NOT NULL,
PRIMARY KEY (applicant_id),
UNIQUE (phone),
FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE NO ACTION ON UPDATE CASCADE); 

CREATE TABLE Branch(
branch_id INT AUTO_INCREMENT,
name VARCHAR(190),
services VARCHAR(190),
PRIMARY KEY (branch_id),
FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE Staff(
staff_id INT AUTO_INCREMENT,
name VARCHAR(190),
phone VARCHAR(190),
location_id INT NOT NULL,
PRIMARY KEY (staff_id),
UNIQUE (phone),
FOREIGN KEY (location_id) REFERENCES Branch(location_id) ON DELETE NO ACTION ON UPDATE CASCADE);

CREATE TABLE Application(
application_id INT AUTO_INCREMENT,
status VARCHAR(190),
pets VARCHAR(190),
budget INT,
home_type VARCHAR(190),
animal_id INT NOT NULL,
applicant_id INT NOT NULL,
staff_id INT NOT NULL,
PRIMARY KEY (application_id),
FOREIGN KEY (animal_id) REFERENCES Animal(animal_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (applicant_id) REFERENCES Applicant(applicant_id) ON DELETE NO ACTION ON UPDATE CASCADE,
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE NO ACTION ON UPDATE CASCADE); 

/* Populate tables */

INSERT INTO Species(name, breed, fee, type)
VALUES ('Cat', 'Maine coon', 150, 'domestic'),
('Cat', 'Domestic shorthair', 100, 'domestic'),
('Dog', 'Laborador', 200, 'domestic'),
('Pig', 'Miniature', 100, 'farm'), 
('Bird', 'African grey', 300, 'exotic'),
('Hamster', 'Dwarf', 10, 'small');


INSERT INTO Location(address, city)
VALUES ('333 Main St', 'Vancouver'),
('4504 Granville St', 'North Vancouver'),
('2438 No. 4 Rd', 'Richmond'),
('2349 Burrard St', 'Vancouver'),
('5666 Dover Rd', 'Nelson'),
('3477 No. 5 Rd ', 'Richmond'),
('4773 Snow Rd', 'Delta'),
('1977 W 3rd Ave', 'Nelson'),
('4321 Main St', 'North Vancouver'),
('4530 W 15th Ave', 'Vancouver');

INSERT INTO Animal(birthdate, sex, intake_date, special_needs, weight, name, img_url, species_id, location_id)
VALUES ('2010-01-14', 'm', '2018-01-09', 'none', 11, 'Fluffy', 'https://image.ibb.co/iRkC77/1.jpg', 2, 3),
('2014-07-22', 'f', '2018-02-10', 'diabetic', 8, 'Abbath', 'https://image.ibb.co/kua6Zn/2.jpg', 1, 2),
('2015-02-11', 'm', '2017-12-20', 'overweight', 20, 'Big Boned', 'https://preview.ibb.co/mJ9B0S/3.jpg', 3, 6),
('2016-05-04', 'm', '2018-01-10', 'none', 9, 'Pinky', 'https://image.ibb.co/dzh3En/4.jpg', 4, 1),
('2007-09-11', 'f', '2017-12-01', 'none', 4, 'Eeyore', 'https://image.ibb.co/ctMkS7/5.jpg', 5, 3),
('2013-02-17', 'm', '2018-03-10', 'no kids', 9, 'Euronymous', 'https://image.ibb.co/bv6Kn7/6.jpg', 2, 4),
('2014-08-01', 'm', '2016-01-01', 'none', 9, 'Sloth', 'https://image.ibb.co/cQ9YEn/7.jpg', 1, 3),
('2016-09-11', 'f', '2017-11-11', 'no cats', 10, 'Sticky', 'https://image.ibb.co/hNqUn7/8.jpg', 3, 3),
('2010-06-06', 'm', '2017-12-24', 'none', 8, 'Teacup', 'https://preview.ibb.co/kbxELS/9.jpg', 4, 3),
('2006-06-06', 'm', '2017-12-13', 'none', 6, 'Ebony', 'https://image.ibb.co/fvYAun/10.jpg', 5, 1),
('2016-09-15', 'm', '2018-03-24', 'none', 8, 'Fenriz', 'https://image.ibb.co/hqwifS/11.jpg', 2, 2),
('2015-12-03', 'm', '2018-03-23', 'none', 7, 'Erik', 'https://image.ibb.co/gtz3fS/12.jpg', 2, 3),
('2017-08-05', 'f', '2018-01-14', 'none', 10, 'Loafy', 'https://image.ibb.co/hADJEn/13.jpg', 1, 4),
('2018-01-22', 'm', '2017-12-27', 'none', 9, 'Furball', 'https://image.ibb.co/eBuVS7/14.jpg', 1, 3),
('2018-3-14', 'm', '2018-03-25', 'none', 1, 'Hammy', 'https://image.ibb.co/d4ALS7/15.jpg', 6, 3);

INSERT INTO Applicant(email, name, phone, location_id)
VALUES ('timmylin11@hotmail.com', 'Timmy Lin', '7783553887', 7),
('jamielu@gmail.com', 'Jamie Lu', '7783541937', 8),
('kilanno4@gmail.com', 'Kilan No', '6043792457', 9),
('crazycatlady@yahoo.com', 'Linda Smith', '7783216373', 10),
('jaketrey@yahoo.com', 'Jake Trey', '5024738872', 6),
('slothlover@yahoo.com', 'Lisa Lu', '7788324564', 8),
('samwu96@yahoo.com', 'Sam Wu', '6043724432', 10),
('elliejno4@gmail.com', 'Ellie No', '6043762457', 9);

INSERT INTO Branch(name, services, location_id)
VALUES ('Vancouver Furr-iends Central', 'adoption, information',1),
('North Shore Education Centre', 'information',2),
('Richmond Education and Adoption Centre', 'adoption, information',3),
('Furr-iends Office', 'information, administration',4),
('Nelson Adoption Centre', 'adoption, information',5);

INSERT INTO Staff(name, phone, location_id)
VALUES ('John Smith', '7783764326', 3),
('Katy Li', '6047682776', 4),
('Mimi Lo', '7784875567', 1),
('Tim Thomson', '6046286664', 2),
('Lisa Li', '7784492458', 5);
 
INSERT INTO Application(status, pets, budget, home_type, animal_id, applicant_id, staff_id)
VALUES ('pending', 'none', 10000, 'apartment', 4, 3, 1),
('approved', '1 dog', 15000, 'house', 1, 2, 1),
('rejected', '6 cats', 10000, 'townhouse', 5, 4, 2),
('approved', 'none', 20000, 'townhouse', 5, 3, 1),
('approved', 'none', 12000, 'house', 3, 1, 3),
('pending', '1 cat', 10000, 'apartment', 2, 5, 5),
('pending', 'none', 16000, 'house', 6, 7, 1),
('rejected', '1 cat', 10000, 'townhouse', 8, 8, 2),
('pending', 'none', 18000, 'house', 7, 6, 2),
('pending', 'none', 14000, 'apartment', 7, 5, 1),
('pending', 'none', 14000, 'townhouse', 10, 5, 1),
('approved', 'none', 8000, 'apartment', 10, 8, 3),
('pending', 'none', 11000, 'townhouse', 11, 7, 2),
('pending', 'none', 9000, 'apartment', 12, 5, 4),
('pending', 'none', 12000, 'townhouse', 13, 3, 3),
('pending', 'none', 11000, 'condo', 14, 1, 2),
('pending', 'none', 12000, 'condo', 6, 4, 2),
('pending', 'none', 13000, 'apartment', 6, 2, 1),
('pending', 'none', 19000, 'town', 6, 8, 2),
('pending', 'none', 8000, 'farmhouse', 4, 2, 5);
