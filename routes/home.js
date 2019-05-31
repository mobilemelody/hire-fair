const express = require('express');
const router = express.Router();


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