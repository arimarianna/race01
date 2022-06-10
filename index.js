const express = require('express');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const config = require('../config.json');
const db = require('./models/db');

let app = express();

const hostname = '127.0.0.1',
	port = 8000;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/views/registration.html'));
});

app.get('/public/styles.css', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/styles.css'));
});

app.get('/public/assets/logo.png', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/assets/logo.png'));
});

////////////////

app.post('/auth', function (request, response) {
	const { email, login, password } = request.body;

	if (!request.body)
		return response.sendStatus(400);

	if (email && login && password) {
		db.query('SELECT * FROM users WHERE email = ? AND login = ? AND password = ?', [email, login, password], function (error, results, fields) {
			if (error) throw error;

			if(results.lenght > 0) {
				request.flash('error', 'The email is already in use');
				response.redirect('/')
			}
		});
		response.end();
	}
});

////////////////

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}/`);
});
