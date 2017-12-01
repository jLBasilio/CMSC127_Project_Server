'use strict';

const db = require(__dirname + '/../lib/mysql');

// exports.post_people = (req, res, next) => {
// 	const data = {
// 		name: req.body.data.name,
// 		details: req.body.data.detail
// 	};
// 	const query_string = 'INSERT INTO people (name, details) VALUES (?, ?)';

// 	db.query(query_string, [req.body.data.name, req.body.data.detail], (err, result) => {
// 		res.send(result);
// 	});
// };

// exports.get_people = (req, res, next) => {
// 	const data = {
// 		name: req.query.name
// 	};
	
// 	db.query('SELECT * FROM people where name = ?', [data.name], (err, result) => {
// 		res.send(result);
// 	});
// };

// exports.get_all_people = (req, res, next) => {
// 	db.query('SELECT * FROM people', [], (err, result) => {
// 		res.send(result);
// 	});
// };

// exports.put_people = (req, res, next) => {
// 	res.send('This is a PUT');
// };

// exports.delete_people = (req, res, next) => {
// 	res.send('This is a DELETE');
// };

	//Feature - add
exports.post_bill = (req, res, next) => {
	const query_string = 'call insertnewBill (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	db.query(query_string, [
		req.body.billType, req.body.title,
		req.body.dateFiled, req.body.longTitle,
		req.body.scope, req.body.firstName,
		req.body.middleInitial, req.body.lastName,
		req.body.firstReading, req.body.secondReading,
		req.body.thirdReading

		], (err, result) => {
		res.send(result);
	});
};

exports.post_senator = (req, res, next) => {
	console.log(req.body);
	const query_string = 'call insertnewSenator (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	db.query(query_string, [
		req.body.legislatorType,
		req.body.firstName,
		req.body.middleInitial, 
		req.body.lastName,
		req.body.office, 
		req.body.senatePosition, 
		req.body.directLine, 
		req.body.trunkLine,
		req.body.email, 
		req.body.website

		], (err, result) => {
		console.log(err);
		res.send(result);
	});
};

exports.post_house_member = (req, res, next) => {
	const query_string = 'call insertnewHouseMember (?, ?, ?, ?, ?, ?, ?, ?, ?)';

	db.query(query_string, [
		req.body.legislatorType, req.body.firstName,
		req.body.middleInitial, req.body.lastName,
		req.body.office, req.body.province,
		req.body.district, req.body.directLine,
		req.body.phoneNo
		], (err, result) => {
		res.send(result);
	});
};

exports.delete_senator = (req, res, next) => {
	const legislatorId = req.params.legislatorId;

	const query_string = 'call deleteSenator (?)';
	
	db.query(query_string, [legislatorId], (err, result) => {
		res.send(result);
	});
};

exports.delete_house_member = (req, res, next) => {
	const legislatorId = req.params.legislatorId;

	const query_string = 'call deleteHouseMember (?)';
	
	db.query(query_string, [legislatorId], (err, result) => {
		res.send(result);
	});
};

exports.delete_senator = (req, res, next) => {
	const legislatorId = req.params.legislatorId;

	const query_string = 'call deleteSenator (?)';
	
	db.query(query_string, [legislatorId], (err, result) => {
		res.send(result);
	});
};

exports.delete_house_member = (req, res, next) => {
	const legislatorId = req.params.legislatorId;

	const query_string = 'call deleteHouseMember (?)';
	
	db.query(query_string, [legislatorId], (err, result) => {
		res.send(result);
	});
};

exports.put_senator = (req, res, next) => {
	const legislatorId = req.params.legislatorId;

	const query_string = 'call updateSenator (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	db.query(query_string, [
		legislatorId, 
		req.body.firstName,
		req.body.middleInitial,
		req.body.lastName,
		req.body.office,
		req.body.senatePosition,
		req.body.directLine,
		req.body.trunkLine,
		req.body.email,
		req.body.website

	], (err, result) => {
		res.send(result);
	});
};

exports.put_house_member = (req, res, next) => {
	const legislatorId = req.params.legislatorId;
	const query_string = 'call updateHouseMember (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	console.log(req.body);

	db.query(query_string, [
		legislatorId,
		req.body.firstName,
		req.body.middleInitial,
		req.body.lastName,
		req.body.office,
		req.body.province,
		req.body.district,
		req.body.directLine,
		req.body.phoneNo
	], (err, result) => {
		res.send(result);
	});
};


//View All
exports.get_all_bills = (req, res, next) => {
	db.query('SELECT * FROM Bill natural join BillStatus', [], (err, result) => {
		res.send(result);
	});
};

exports.get_all_senators = (req, res, next) => {
	db.query('SELECT * FROM Legislator L join Senator S on L.legislatorId = S.legislatorId', [], (err, result) => {
		res.send(result);
	});
};

exports.get_all_house_members = (req, res, next) => {

	db.query('SELECT * FROM Legislator natural join HouseMember', [], (err, result) => {
		res.send(result);
	});
};

//Feature- Search
exports.get_bill_by_billno = (req, res, next) => {
	const billNo = req.params.billNo;

	const query_string = 'SELECT * FROM Bill natural join BillStatus where billNo = ?';

	db.query(query_string, [billNo], (err, result) => {
		res.send(result);
	});
};

exports.get_senator_by_id = (req, res, next) => {
	const senatorId = req.params.senatorId;

	const query_string = 'SELECT * FROM Legislator natural join Senator where legislatorId = ?';

	db.query(query_string, [senatorId], (err, result) => {
		res.send(result);
	});
};

exports.get_house_member_by_id = (req, res, next) => {
	const housememberId = req.params.housememberId;

	const query_string = 'SELECT * FROM Legislator natural join HouseMember where legislatorId = ?';

	db.query(query_string, [housememberId], (err, result) => {
		res.send(result);
	});
};

//DELETE
exports.delete_bill = (req, res, next) => {
	const billNo = req.params.billNo;

	const query_string = 'call deleteBill (?)';
	
	db.query(query_string, [billNo], (err, result) => {
		res.send(result);
	});
};

// EDIT
exports.put_bill = (req, res, next) => {
	const billNo = req.params.billNo;

	const query_string = 'call updateBill (?, ?, ?, ?, ?, ?, ?, ?)';
	
	db.query(query_string, [
		billNo,
		req.body.title,
		req.body.dateFiled,
		req.body.longTitle,
		req.body.scope,
		req.body.firstReading,
		req.body.secondReading,
		req.body.thirdReading
	], (err, result) => {
		res.send(result);
	});
};


//REPORTS
//1.bills passed at senate on the year <year>
exports.get_bills_by_year = (req, res, next) => {
	const year = req.params.year;

	const query_string = 'SELECT * FROM Bill natural join BillStatus where year(dateFiled) = ?';

	db.query(query_string, [year], (err, result) => {
		res.send(result);
	});
};

//2-3.
exports.get_bills_by_author = (req, res, next) => {
	const firstName = req.params.firstName;
	const middleInitial = req.params.middleInitial;
	const lastName = req.params.lastName;


	const query_string = 'SELECT * FROM Bill natural join BillStatus where firstName = ? and middleInitial = ? and lastName = ?';

	db.query(query_string, [firstName, middleInitial, lastName], (err, result) => {
		res.send(result);
	});
};



//4-7
exports.get_bills_passed_on_status = (req, res, next) => {
	const status = req.params.status;

	if(status === '1'){
		const query_string = 'SELECT * FROM Bill natural join BillStatus where firstReading = ?';

		db.query(query_string, ["Passed"], (err, result) => {
			res.send(result);
		});
	}else if(status === '2'){
		const query_string = 'SELECT * FROM Bill natural join BillStatus where secondReading = ?';

		db.query(query_string, ["Passed"], (err, result) => {
			res.send(result);
		});
	}else if(status === '3'){
		const query_string = 'SELECT * FROM Bill natural join BillStatus where thirdReading = ?';

		db.query(query_string, ["Passed"], (err, result) => {
			res.send(result);
		});
	}else{
		res.send('INVALID STATUS NO');
	}
};

//Additional Controllers
exports.get_all_authors = (req, res, next) => {
	db.query('SELECT legislatorType, firstName, middleInitial, lastName FROM Legislator', [], (err, result) => {
		res.send(result);
	});
};