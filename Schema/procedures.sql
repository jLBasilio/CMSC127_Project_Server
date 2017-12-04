use Bill_System
/*PROCEDURE for Adding of senator*/

DROP Procedure IF EXISTS insertnewSenator;
delimiter //
CREATE PROCEDURE insertnewSenator (
	legislatorType VARCHAR(15),
	firstName VARCHAR(64), 
	middleInitial VARCHAR(64), 
	lastName VARCHAR(64), 
	office VARCHAR(256),	
	senatePosition VARCHAR(64),
	directLine VARCHAR(20), 
	trunkLine VARCHAR(20), 
	email VARCHAR(256), 
	website VARCHAR(256)
)
BEGIN
	declare id int; 
	INSERT INTO Legislator (
		legislatorType, 
		firstName, 
		middleInitial, 
		lastName
	) 
	values (
		legislatorType, 
		firstName, 
		middleInitial, 
		lastName
	);
	select Le.legislatorId into id from Legislator Le
		where Le.firstName = firstName and Le.middleInitial = middleInitial and Le.lastName = lastName;
	INSERT INTO Senator (
		legislatorId,
		office,
		senatePosition,
		directLine,
		trunkLine,
		email,
		website
	)
	values (
		id, 
		office, 
		senatePosition, 
		directLine, 
		trunkLine, 
		email, 
		website
	);
END//
delimiter ; 

/*PROCEDURE for Adding of House Member*/
DROP Procedure IF EXISTS insertnewHouseMember;
delimiter //
CREATE PROCEDURE insertnewHouseMember (
	legislatorType VARCHAR(15),
	firstName VARCHAR(64),
	middleInitial VARCHAR(64),
	lastName VARCHAR(64),
	office VARCHAR(256),
	province VARCHAR(64),
	district VARCHAR(64),
	directLine VARCHAR(20),
	phoneNo VARCHAR(20)
)
BEGIN
	declare id int; 
	INSERT INTO Legislator (
		legislatorType,
		firstName, 
		middleInitial, 
		lastName
	) 
	values (
		legislatorType, 
		firstName, 
		middleInitial, 
		lastName
	);
	select L.legislatorId into id from Legislator L 
		where L.firstName = firstName and L.middleInitial = middleInitial and L.lastName = lastName;
	INSERT INTO HouseMember(
		legislatorId,
		office,
		province,
		district,
		directLine,
		phoneNo
	)
	values (
		id, 
		office, 
		province,
		district,
		directLine,
		phoneNo
	);
END//
delimiter ; 


/*Procedure for Adding Bill*/
/*
1. get information of the bill
2. check if the Author Exist in the Data
3. check if correct yung gumagawa ng biill
	eg. kung senator -> senate bill
		if house member -> house bill
requirements before calling the procedure
*/
DROP Procedure IF EXISTS insertnewBill;
delimiter //
CREATE PROCEDURE insertnewBill (
	billType VARCHAR(5),
	title VARCHAR(256),
	dateFiled VARCHAR(64),
	longTitle VARCHAR(999),
	scope VARCHAR(64),
	
	firstName VARCHAR(64),
	middleInitial VARCHAR(64),
	lastName VARCHAR(64),

	firstReading VARCHAR(64),
	secondReading VARCHAR(64),
	thirdReading VARCHAR(64)
)
BEGIN
	declare no int; 

	INSERT INTO Bill (
		billType,
		title,
		dateFiled,
		longTitle,
		scope,
		firstName,
		middleInitial,
		lastName
	) 
	values (
		billType,
		title,
		str_to_date(dateFiled, "%Y-%m-%d"),
		longTitle,
		scope,
		firstName,
		middleInitial,
		lastName
	);

	select billNo into no from Bill B 
		where B.title = title and B.dateFiled = str_to_date(dateFiled, "%Y-%m-%d");

	INSERT INTO BillStatus
	values (
		no,
		firstReading,
		secondReading,
		thirdReading
	);
END//
delimiter ;

DROP Procedure IF EXISTS deleteBill;
delimiter //
CREATE PROCEDURE deleteBill (
	billNo INT(4)
)
BEGIN
	DELETE FROM BillStatus WHERE BillStatus.billNo = billNo;

	DELETE FROM Bill WHERE Bill.billNo = billNo;
END//
delimiter ; 

/*DELETE Bill*/
DROP Procedure IF EXISTS deleteSenator;
delimiter //
CREATE PROCEDURE deleteSenator (
	legislatorId INT(4)
)
BEGIN
	DELETE FROM Senator WHERE Senator.legislatorId = legislatorId;
	DELETE FROM Legislator WHERE Legislator.legislatorId = legislatorId;
END//
delimiter ; 

/* ----------------------------------------*/
DROP Procedure IF EXISTS deleteHouseMember;
delimiter //
CREATE PROCEDURE deleteHouseMember (
	legislatorId INT(4)
)
BEGIN
	DELETE FROM HouseMember WHERE HouseMember.legislatorId = legislatorId;
	DELETE FROM Legislator WHERE Legislator.legislatorId = legislatorId;
END//
delimiter ;


/*UPDATE FOR BILL*/
DROP Procedure IF EXISTS updateBill;
delimiter //
CREATE PROCEDURE updateBill(
	billNo INT(4),
	title VARCHAR(256),
	dateFiled VARCHAR(64),
	longTitle VARCHAR(999),
	scope VARCHAR(64),
	firstReading VARCHAR(64),
	secondReading VARCHAR(64),
	thirdReading VARCHAR(64)
)
BEGIN
	UPDATE Bill 
	SET 
		Bill.title = title,
		Bill.dateFiled = dateFiled,
		Bill.longTitle = longTitle,
		Bill.scope = scope
	 
	WHERE Bill.billNo = billNo;

	UPDATE BillStatus
	SET 
		BillStatus.firstReading = firstReading,
		BillStatus.secondReading = secondReading,
		BillStatus.thirdReading = thirdReading
	
	WHERE BillStatus.billNo = billNo;
END//
delimiter ;

/*UPDATE FOR SENATOR*/
DROP Procedure IF EXISTS updateSenator;
delimiter //
CREATE PROCEDURE updateSenator(
	legislatorId INT(4),
	firstName VARCHAR(64), 
	middleInitial VARCHAR(64), 
	lastName VARCHAR(64), 
	office VARCHAR(64),	
	senatePosition VARCHAR(64),
	directLine VARCHAR(20), 
	trunkLine VARCHAR(20), 
	email VARCHAR(64), 
	website VARCHAR(64)
)
BEGIN
	UPDATE Legislator 
	SET 
		Legislator.firstName = firstName,
		Legislator.middleInitial = middleInitial,
		Legislator.lastName = lastName
	 
	WHERE Legislator.legislatorId = legislatorId;

	UPDATE Senator
	SET 
		Senator.office = office,
		Senator.senatePosition = senatePosition,
		Senator.directLine = directLine,
		Senator.trunkLine = trunkLine,
		Senator.email = email,
		Senator.website = website 
	
	WHERE Senator.legislatorId = legislatorId;
END//
delimiter ;

/*UPDATE FOR BILL*/
DROP Procedure IF EXISTS updateHouseMember;
delimiter //
CREATE PROCEDURE updateHouseMember(
	legislatorId INT(4),
	firstName VARCHAR(64), 
	middleInitial VARCHAR(64), 
	lastName VARCHAR(64),
	office VARCHAR(64),
	province VARCHAR(64),
	district VARCHAR(64),
	directLine VARCHAR(20),
	phoneNo VARCHAR(20)
)
BEGIN
	UPDATE Legislator 
	SET 
		Legislator.firstName = firstName,
		Legislator.middleInitial = middleInitial,
		Legislator.lastName = lastName
	 
	WHERE Legislator.legislatorId = legislatorId;

	UPDATE HouseMember
	SET 
		HouseMember.office = office,
		HouseMember.province = province,
		HouseMember.district = district,
		HouseMember.directLine = directLine,
		HouseMember.phoneNo = phoneNo
	
	WHERE HouseMember.legislatorId = legislatorId;
END//
delimiter ;
/*UPDATE*/

/*DELETE*/

/*SEARCH*/







