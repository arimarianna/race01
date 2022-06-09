const express = require('express');
const path = require('path');
// const mysql = require('mysql2');
const session = require('express-session');
const config = require('./config.json');

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
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/public/styles.css', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/styles.css'));
});

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}/`);
});
