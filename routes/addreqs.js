const express = require('express');
const router = express.Router();

/* Route for add requirements form */
router.get('/:id', function(req, res, next) {
	if (req.session.isEmployer) {
		let context = req.session;
		
		// Query to retrieve the listing that was just created
		let mysql = req.app.get('mysql');
		let sql = "SELECT * FROM listing WHERE listingID=?";
		let inserts = [req.params.id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			
			if(results != undefined){
				context['listingid'] = req.params.id;
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

/* Route to add requirements to database */
router.post('/:id', function(req, res, next) {
	let context = {};

	let mysql = req.app.get('mysql');
	let sql = "INSERT INTO requirement (reqType, description, weight, listingID) VALUES ";
	let inserts = [];

	/* Add default education requirement */
	sql += "(?, ?, ?, ?)";
	inserts.push("education");
	inserts.push(req.body['education-combo']);
	inserts.push(req.body['education-slider']);
	inserts.push(req.params.id);

	/* Add default experience requirement */
	sql += ", (?, ?, ?, ?)";
	inserts.push("experience");
	inserts.push(req.body['experience-combo']);
	inserts.push(req.body['experience-slider']);
	inserts.push(req.params.id);

	/* Add custom requirements */
	let reqTypes = ['education', 'experience', 'skills', 'certifications'];
	for (let i = 0; i < 4; i++) {
		let type = reqTypes[i];
		let numReqs = req.body[type + '-num-requirements'];

		for (let j = 0; j < numReqs; j++) {
			sql += ", (?, ?, ?, ?)";
			inserts.push(type);
			inserts.push(req.body[type + '-custom-req-' + j]);
			inserts.push(req.body[type + '-custom-req-' + j + '-slider']);
			inserts.push(req.params.id);
		}
		
	} 

	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
					
		res.redirect('/');
	})

});


module.exports = router;