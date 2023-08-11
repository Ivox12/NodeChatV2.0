const {sequelize, users} = require('../repo/db.js');

class User {
    constructor (login, pass) {
        this.login = login
        this.pass = pass
        console.log('constructor executado')
    }

    static async getUser(info) {
        await sequelize.sync();
        const user = await users.findOne({
            where: {
                name: info.login,
                password: info.pass
            }
        });
        return (!!user);
    }
}

module.exports = User