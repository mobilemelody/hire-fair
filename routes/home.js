const express = require('express');
const router = express.Router();


/* Route for home page */
router.get('/', function(req, res, next) {
	res.render('home');
});

router.post('/', function(req, res, next) {
	var employer = req.body.employer;
	if(employer != undefined){
		res.redirect('employer-login');
	} else {
		res.redirect('login');
	}
});

module.exports = router;