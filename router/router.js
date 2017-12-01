'use strict';

const system = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
	
	// router.get('/people', people.get_people);

	//router.get('/peoples', people.get_all_people);
	

	// router.delete('/people', people.delete_people);

	// router.put('/people', people.put_people);

	// router.post('/people', people.post_people);

//FEATURES
//add feature
	router.post('/add-bill', system.post_bill);
	router.post('/add-senator', system.post_senator);
	router.post('/add-house-member', system.post_house_member);

//view all feature
	router.get('/get-all-bills', system.get_all_bills);
	router.get('/get-all-senators', system.get_all_senators);
	router.get('/get-all-house-members', system.get_all_house_members);

//search feature	
	router.get('/get-bill/:billNo', system.get_bill_by_billno);
	router.get('/get-senator/:senatorId', system.get_senator_by_id);
	router.get('/get-house-member/:housememberId', system.get_house_member_by_id);
//delete feature
	router.delete('/delete-bill/:billNo', system.delete_bill);
	router.delete('/delete-senator/:legislatorId', system.delete_senator);
	router.delete('/delete-house-member/:legislatorId', system.delete_house_member);
	
// edit feature
	router.put('/put-bill/:billNo', system.put_bill);
	router.put('/put-senator/:legislatorId', system.put_senator);
	router.put('/put-house-member/:legislatorId', system.put_house_member);

//REPORTS
	router.get('/get-bills-in/:year', system.get_bills_by_year);
	router.get('/get-bills-by/:firstName/:middleInitial/:lastName', system.get_bills_by_author);
	router.get('/get-bills-passed/:status', system.get_bills_passed_on_status);

//ADDITIONAL routes 
	router.get('/get-authors', system.get_all_authors);
	
	router.all('*', (req, res, next) => {
		res.send({message: 'Sorry this page is under construction. :('});
	});	

	return router;
};