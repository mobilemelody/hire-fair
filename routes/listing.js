const express = require('express');
const router = express.Router();


/* Route for login page */
router.get('/', function(req, res, next) {
	res.render('listing');
});

router.post('/', function(req, res, next) {
	let context = {};
	let mysql = req.app.get('mysql');	

	var bool = req.body.internal != undefined;
	// Verification of username and password
	let sql = "INSERT INTO listing (internal, jobTitle, location, description, salary, email, phone) VALUES(?, ?, ?, ?, ?, ?, ?)";
	let inserts = [bool, req.body.JobTitle, req.body.location, req.body.description, req.body.deadline,
					req.body.salary, req.body.email, req.body.phone];

	console.log(sql);
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}

		
	})
	res.render('home');
});

module.exports = router;