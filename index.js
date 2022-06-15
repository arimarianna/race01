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

const hostname = 'localhost',
    port = 8000;
let app = express();

const templateEngine = new TemplateEngine()

app.use(express.static(__dirname + '/public'));
app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/public/views')
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
    session = req.session
    if (session.userData) {
        res.redirect('/board')
    } else {
        res.redirect('/login')
    }
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
            session = req.session
            session.userData = user

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
    })

    let info = await transporter.sendMail({
        from: 'veronika0melehova@gmail.com',
        to: user.email,
        subject: "Password reset",
        text: `Hey, ${user.login}, the new password for your *** account is: ${password}. If you did not confirm reset of password, do it now. Only you can see this password`,
        html: `<p>Hey, <h1>${user.login}</h1></p><div><p>, the new password for your *** account is: <code>${password}</code></p><p>If you did not confirm reset of password, do it now. Only you can see this password</p></div>`
    })
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
