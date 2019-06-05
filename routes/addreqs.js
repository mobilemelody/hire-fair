const express = require('express');
const router = express.Router();

/* Route for add requirements form */
router.get('/:id', function(req, res, next) {
	if (req.session.isEmployer) {
		let context = req.session;
		
		// Query to retrieve the listing that was just created
		let mysql = req.app.get('mysql');
		let sql = "SELECT * FROM listing WHERE listingID = ?";
		let inserts = [req.params.id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context['jobTitle'] = results['jobTitle'];
			context['salary'] = results['salary'];
			context['location'] = results['location'];
			context['listingType'] = results['Internal'];
			res.render('addreqs', context);
		}) 
	}
	else {
		res.render('employerlogin');
	}
});


module.exports = router;