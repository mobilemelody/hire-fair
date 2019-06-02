const express = require('express');
const router = express.Router();

/* Route for homepage */
router.get('/',function(req,res,next) {
	let context = {};

	// If there is no session, show homepage
	if (!req.session.username) {
		res.render('home');
	}

	// Otherwise show dashboard
	else {
		context = req.session;
		res.render('dashboard', context);
	}

});

/* Route to show appropriate login page */
router.post('/', function(req, res, next) {
	// Check if the employer button was pressed
	var employer = req.body.employer;
	if(employer != undefined){
		res.redirect('employer-login');
	} else {
		res.redirect('login');
	}
});

module.exports = router;