const express = require('express');
const router = express.Router();

/* Note: Filter by context.session.username */
function getExternalListings(res, mysql, context, complete) {
	let sql = "SELECT * from listing WHERE internal=0 AND employerUserName=?;";
	var inserts = context.session.username;  // TODO
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
	})
	context.external = results;
	complete();
}

function getInternalListings(res, mysql, context, complete) {
	let sql = "SELECT * from listing WHERE internal=1 AND employerUserName=?;";
	var inserts = context.session.username;  // TODO
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
	})
	context.internal = results;
	complete();
}

/* Route for homepage */
router.get('/',function(req,res,next) {
	let context = {};

	// If there is no session, show homepage
	if (!req.session.username) {
		res.render('home');
	}

	// Otherwise show dashboard
	else {
		let context = {};
		let mysql = req.app.get('mysql');
		context = req.session;
		
		getExternalListings(res, mysql, context, complete);
		getInternalListings(res, mysql, context, complete);

		function complete() {
		    callbackCount++;
		    if(callbackCount >= 2) {
		      res.render('beer_form', context);
		    }
		  }
		
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