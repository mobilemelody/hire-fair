const express = require('express');
const router = express.Router();


/* Route for listing form */
router.get('/', function(req, res, next) {
	
		let context = req.session;
		res.render('listing', context);
	
});

/* Route to add listing */
router.post('/', function(req, res, next) {
	let context = {};
	let mysql = req.app.get('mysql');	

	let bool = req.body.internal != undefined;
	let sql = "INSERT INTO listing (internal, jobTitle, location, description, salary, email, phone, employerUserName, deadline) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
	let inserts = [bool, req.body.JobTitle, req.body.location, req.body.description,
					req.body.salary, req.body.email, req.body.phone, req.session.username,req.body.deadline];

	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
	})
	context = req.session;
	res.render('home', context);
});

module.exports = router;