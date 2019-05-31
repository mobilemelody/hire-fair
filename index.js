require('dotenv').config();

const express = require('express');
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout:'main' });
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', PORT);
app.set('mysql', mysql);

/* Routes */
app.use('/login', require('./routes/login.js'));
app.use('/employer-login', require('./routes/employerlogin.js'));
app.use('/', require('./routes/home.js'));

app.use(express.static('public'));

/* Homepage */
app.get('/',function(req,res,next) {
	let context = {};

	// If there is no session, show homepage
	if (!req.session.username) {
		res.render('home');
	}

	// Otherwise show dashboard
	else {
		context.username = req.session.username;
		context.isEmployer = req.session.isEmployer;
		context.firstname = req.session.firstname;
		context.lastname = req.session.lastname;
		res.render('dashboard', context);
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