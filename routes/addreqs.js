const express = require('express');
const router = express.Router();

/* Route for add requirements form */
router.get('/:id', function(req, res, next) {
	if (req.session.isEmployer) {
		let context = req.session;
		
		// Query to retrieve the listing that was just created
		let mysql = req.app.get('mysql');
		let sql = "SELECT * FROM listing WHERE listingID=?";
		let listingID = req.params.id.substr(1);
		let inserts = [listingID];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			
			if(results != undefined){
				context['jobTitle'] = results[0].jobTitle;
				context['salary'] = results[0].salary;
				context['location'] = results[0].location;
				if(results[0].internal){
					context['listingType'] = "Internal";
				} else {
					context['listingType'] = "External";
				}
			}
			
			res.render('addreqs', context);
		}) 
	}
	else {
		res.render('employerlogin');
	}
});


module.exports = router;