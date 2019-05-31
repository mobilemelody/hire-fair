const express = require('express');
const router = express.Router();


/* Route for home page */
router.get('/', function(req, res, next) {
	res.render('home');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var employer = req.body.employer;
	if(employer != undefined){
		res.render('employerlogin');
	} else {
		res.render('login');
	}
});

module.exports = router;