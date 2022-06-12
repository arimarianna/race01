const db = require('./db')
const bcrypt = require('bcrypt')

module.exports = class Model {
    constructor(properties) {
        this.id = 0;
        this.login = properties.login;
        this.email = properties.email;
        this.password = properties.password;
    }

    async findSelf() {
        await db
            .promise()
            .query(`SELECT * FROM users WHERE login ='${this.login}' AND email='${this.email}'`)
            .then((res) => {
                let match = bcrypt.compareSync(this.password, res[0][0].password)
                // console.log(res, this.password, res[0][0].password, match)
                if (res[0].length !== 0 && match) {
                    this.id = res[0][0].id;
                    let salt = bcrypt.genSaltSync(Number(this.password[0]))
                    this.password = bcrypt.hashSync(this.password[0], salt);
                    console.log('OK')
                } else {
                    console.error('NE OK')
                    this.id = null
                    this.login = null
                    this.email = null
                    this.password = null
                    console.error('Incorrect data')
                }
                return this
            })
    }
    async find(id) {
        const [result, _] = await db
            .promise()
            .query(`SELECT * FROM users WHERE id ='${id}'`);

        this.id = id;
        this.login = result[0].login;
        this.email = result[0].email;
        this.password = result[0].password;
    }
    async save() {
        console.log("vev", this.login, this.email, this.password)
        await db
            .promise()
            .query(
                `INSERT INTO users(login, email, password)
                    VALUES ('${this.login}', '${this.email}', '${this.password}')
                    ON DUPLICATE KEY UPDATE
                    login = VALUES(login),
                    email = VALUES(email),
                    password = VALUES(password);`)
        const [dataUser, _] = await db
            .promise()
            .query(`SELECT * FROM users WHERE LOGIN = '${this.login}'`)
        this.id = dataUser[0].id;
    }

    delete() {
        db.query(`DELETE from users WHEREC id='${this.id}'`, (err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('User delete');
            }
        });
    }
}
