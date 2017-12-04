-- creation of the database
DROP DATABASE IF EXISTS Bill_System;
CREATE DATABASE Bill_System;
use Bill_System;

CREATE TABLE Legislator(
	legislatorId INT(4) NOT NULL AUTO_INCREMENT,
	legislatorType VARCHAR(15) NOT NULL,
	firstName VARCHAR(64) NOT NULL,
	middleInitial VARCHAR(64) NOT NULL,
	lastName VARCHAR(64) NOT NULL,
	CONSTRAINT Legislator_legislatorId_pk PRIMARY KEY (legislatorId)
); 

CREATE TABLE Senator(
	legislatorId INT(4) NOT NULL,
	office VARCHAR(999) NOT NULL,
	senatePosition VARCHAR(30) NOT NULL,
	directLine VARCHAR(20) NOT NULL,
	trunkLine VARCHAR(20) NOT NULL,
	email VARCHAR(256) NOT NULL,
	website VARCHAR(256),
	CONSTRAINT Senator_legislatorId_fk FOREIGN KEY(legislatorId) REFERENCES Legislator(legislatorId)
);

CREATE TABLE HouseMember(
	legislatorId INT(4) NOT NULL,
	office VARCHAR(999) NOT NULL,
	province VARCHAR(30) NOT NULL,
	district VARCHAR(10) NOT NULL,
	directLine VARCHAR(20) NOT NULL, 
	phoneNo VARCHAR(20) NOT NULL, 
	CONSTRAINT HouseMember_legislatorId_fk FOREIGN KEY(legislatorId) REFERENCES Legislator(legislatorId)
);

CREATE TABLE Bill(
	billNo INT(4) NOT NULL AUTO_INCREMENT,
	billType VARCHAR(5) NOT NULL,
	title VARCHAR(256) NOT NULL,
	dateFiled DATE NOT NULL,
	longTitle VARCHAR(999) NOT NULL,
	scope VARCHAR(20) NOT NULL,
	firstName VARCHAR(64) NOT NULL,
	middleInitial VARCHAR(64) NOT NULL,
	lastName VARCHAR(64) NOT NULL,
	CONSTRAINT Bill_billNo_pk PRIMARY KEY (billNo)
);

CREATE TABLE BillStatus(
	billNo INT(4) NOT NULL,
	firstReading VARCHAR(10) NOT NULL,
	secondReading VARCHAR(10) NOT NULL,
	thirdReading VARCHAR(10) NOT NULL,
	CONSTRAINT BillStatus_billNo_fk FOREIGN KEY (billNo) REFERENCES Bill(billNo)
);