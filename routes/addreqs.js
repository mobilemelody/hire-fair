const express = require('express');
const router = express.Router();

/* Route for add requirements form */
router.get('/:id', function(req, res, next) {
	if (req.session.isEmployer) {
		let context = req.session;
		
		// Query to retrieve the listing that was just created
		let mysql = req.app.get('mysql');
		let sql = "SELECT * FROM listing WHERE listingID='?'";
		let inserts = [req.params.id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			
			if(results.length > 0){
				context['jobTitle'] = results[0].jobTitle;
				context['salary'] = results[0].salary;
				context['location'] = results[0].location;
				context['listingType'] = results[0].Internal;
			}
			
			res.render('addreqs', context);
		}) 
	}
	else {
		res.render('employerlogin');
	}
});


module.exports = router;