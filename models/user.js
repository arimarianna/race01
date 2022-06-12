const Model = require('../models/model')
const db = require('../models/db')
const bcrypt = require('bcrypt')

module.exports = class User extends Model {
    constructor(props) {
        super(props);
    }

    async setNewPassword() {
        let salt = bcrypt.genSaltSync(Number(Math.floor(Math.random() * 10)))
        let pass = generatePassword()
        let passHash = bcrypt.hashSync(pass, salt);
        const [result, _] = await db
            .promise()
            .query(`UPDATE users
            SET password = '${passHash}'
            WHERE login = '${this.login}'`)

        return pass

    }
    find(id) {
        return super.find(id)
    }
    async findByLogin() {
        const [result, _] = await db
            .promise()
            .query(`SELECT * FROM users WHERE login ='${this.login}'`);

        this.id = result[0].id;
        this.login = result[0].login;
        this.email = result[0].email;
        this.password = result[0].password;
    }
    delete() {
        return super.delete()
    }
    save() {
        return super.save()
    }
}

function generatePassword() {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
