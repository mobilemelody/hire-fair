const express = require('express');
const router = express.Router();

/* Route for listing form */
router.get('/', function(req, res, next) {
	if (req.session.isEmployer) {
		let context = req.session;
		
		// Query to retrieve the listing that was just created TODO: fix
		/*let mysql = req.app.get('mysql');	
		let sql = "@@IDENTITY;";
		let inserts = [];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			} else {
				console.log(results[0]);
			}
		})*/
		context['jobTitle'] = "sample title";
		context['salary'] = "sample salary";
		context['location'] = "sample location";
		context['listingType'] = "internal/external";
		res.render('addreqs', context);
	}
	else {
		res.render('employerlogin');
	}
});


module.exports = router;