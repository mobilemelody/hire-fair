const express = require('express');
const router = express.Router();

/* Route for login page */
router.get('/', function(req, res, next) {
	res.render('employerlogin');
});

/* Route to authenticate login */
router.post('/', function(req, res, next) {
	let context = {};
	let mysql = req.app.get('mysql');
	
	// Verification of username and password
	let sql = "SELECT * FROM Employer_User WHERE Username = ? AND Password = ?";
	let inserts = [req.body.userName, req.body.password];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}

		// Username and password found
		if (results.length > 0) {
			req.session.username = results[0].Username;
			req.session.firstname = results[0].First;
			req.session.lastname = results[0].Last;
			req.session.department = results[0].Department;
			req.session.isEmployer = 1;

			context = req.session;

			res.redirect('/');
		}

		// Username and/or password not found
		else {
			context.error = "Username and/or password not found.";
			res.render('employerlogin', context);
		}
	})

});

module.exports = router;