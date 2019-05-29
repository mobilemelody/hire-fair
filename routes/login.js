const express = require('express');
const router = express.Router();


/* Route for login page */
router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	let context = {};
	
	var sql = "SELECT * FROM Applicant_User WHERE Username = ? AND Password = ?";
	
	// Verification of username and password
	

	// Create session

});

module.exports = router;