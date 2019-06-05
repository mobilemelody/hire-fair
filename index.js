require('dotenv').config();

const express = require('express');
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ 
	defaultLayout:'main',
	helpers: {
		formatDate: function(value) {
			return value.toLocaleDateString();
		}
	}
});
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', PORT);
app.set('mysql', mysql);

/* Routes */
app.use('/login', require('./routes/login.js'));
app.use('/employer-login', require('./routes/employerlogin.js'));
app.use('/', require('./routes/home.js'));
app.use('/listing', require('./routes/listing.js'));
app.use('/addreqs', require('./routes/addreqs.js'));

/* Logout */
app.get('/logout',function(req,res,next) {
	if (req.session.username) {
		req.session.destroy(function(error) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			res.redirect('/');
		})
	}
});

/* Routes for error handling */
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

/* Start app */
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});