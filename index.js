const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const sessions = require('express-session');
const config = require('./config.json');
const db = require('./models/db');
const expressThymeleaf = require('express-thymeleaf')
const { TemplateEngine } = require('thymeleaf')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')
const User = require('./models/user')
const nodemailer = require("nodemailer")

let app = express();
const templateEngine = new TemplateEngine()

const hostname = '127.0.0.1',
	port = 8000;


app.use(express.static(__dirname + '/views'));
app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24
app.use(
	sessions({
		secret: 'password secret',
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false
	})
)
let session;
app.get('/', function (req, res) {
    res.send('Bebra! URL is not recognised', 404);
});

app.get('/public/styles.css', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/styles.css'));
});

app.get('/public/assets/logo-welcome.png', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/assets/logo-welcome.png'));
});
app.get('/public/assets/logo-back.png', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/assets/logo-back.png'));
});
app.get('/public/assets/logo-oops.png', function (request, response) {
	response.sendFile(path.join(__dirname + '/public/assets/logo-oops.png'));
});

app.post('/signup', (req, res) => {
    if (!req.body)
        return res.sendStatus(400)
    let salt = bcrypt.genSaltSync(Number(req.body.password[0]))
    let password = bcrypt.hashSync(req.body.password, salt);

    let user = new User({
        login: req.body.login,
        email: req.body.email,
        password: password
    })
    user.save()
    res.redirect('/login')
})

app.post('/login', (req, res) => {
    let user = new User(req.body);
    user.findSelf().then((result) => {
        if (user.id === 0 || user.id === null) {
            listOfUsers().then((lists) => {
                res.render('login', {
                    logins: lists.logins,
                    emails: lists.emails,
                    errorMsg: 'Incorrect Data'
                })
            })
        } else {
                res.redirect('/board')
        }
    })
})

app.post('/reset-password', (req, res) => {
    let user = new User(req.body);
    user.findByLogin().then((result) => {
        res.render('confirm_reset', {
            email: hideEmail(user.email),
            login: user.login
        })
    })
})

app.post('/confirm-reset', (req, res) => {
    let user = new User(req.body);
    user.findByLogin().then((result) => {
        user.setNewPassword().then(pass => {
            sendPassword(user, pass).catch(console.error)
            res.redirect('/login')
        })
    })
})

app.get('/reset-password', (req, res) => {
    listOfUsers().then((lists) => {
        res.render('reset_password', {
            logins: lists.logins
        })
    })
})

app.get('/signup', (req, res) => {
    listOfUsers().then((lists) => {
        res.render('signup', {
            logins: lists.logins,
            emails: lists.emails
        })
    })
})


app.get('/login', (req, res) => {
    listOfUsers().then((lists) => {
        res.render('login', {
            logins: lists.logins,
            emails: lists.emails
        })
    })
})

app.get('/board', (req, res) => {
    session = req.session
    if (session.userData) {
        res.render('board', {
            user: session.userData
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    session = req.session
    if (session.userData) {
        req.session.destroy()
        res.redirect('/login')
    } else {
        res.redirect('/login')
    }
})

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}/`);
});

async function listOfUsers() {
    let logins = [], emails = []
    await db.promise().query('SELECT login, email FROM users')
        .then((res) => {
            res[0].map(item => {
                logins.push(item['login'])
                emails.push(item['email'])
            })

        })
    return { logins: logins, emails: emails }
}

function hideEmail(email) {
    let hidden = '';
    let email1 = email.slice(0, email.indexOf('@'))
    let email2 = email.slice(email.indexOf('@'));
    [...email1].forEach(char => {
        if (Math.floor(Math.random() * 2)) {
            hidden += char
        } else {
            hidden += '*'
        }
    });
    return hidden + email2
}

async function sendPassword(user, password) {
    let account = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        // for gmail
        service: 'gmail',
        auth: {
            user: 'veronika0melehova@gmail.com',
            pass: 'fkcvlgdxccrtsiyg',
        },
        tls: {
            rejectUnauthorized: false
        },

        // for demo
        /*
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass,
        },
        tls: {
            rejectUnauthorized: false
        },
        */

    })
	
    let info = await transporter.sendMail({
        // for demo
        // from: '"Master VM 👻" <vm@example.com>',          
        // for gmail
        from: 'veronika0melehova@gmail.com',
        to: user.email,
        subject: "Password reset",
        text: `Hey, ${user.login}, the new password for your *** account is: ${password}. If you did not confirm reset of password, do it now. Only you can see this password`,
        html: `<p>Hey, <h1>${user.login}</h1></p><div><p>, the new password for your *** account is: <code>${password}</code></p><p>If you did not confirm reset of password, do it now. Only you can see this password</p></div>`
    })
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

/*
        let match = bcrypt.compareSync(req.body.password, password)
    if (match) {
        console.log('OK')
    }
    else
        console.error('NE OK')
*/





// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// app.get('/', function (request, response) {
// 	response.sendFile(path.join(__dirname + '/views/registration.html'));
// });

// app.get('/public/styles.css', function (request, response) {
// 	response.sendFile(path.join(__dirname + '/public/styles.css'));
// });

// app.get('/public/assets/logo.png', function (request, response) {
// 	response.sendFile(path.join(__dirname + '/public/assets/logo.png'));
// });

// ////////////////

// app.post('/auth', function (request, response) {
// 	const { email, login, password } = request.body;

// 	if (!request.body)
// 		return response.sendStatus(400);

// 	if (email && login && password) {
// 		db.query('SELECT * FROM users WHERE email = ? AND login = ? AND password = ?', [email, login, password], function (error, results, fields) {
// 			if (error) throw error;

// 			if(results.lenght > 0) {
// 				request.flash('error', 'The email is already in use');
// 				response.redirect('/')
// 			}
// 		});
// 		response.end();
// 	}
// });

////////////////
