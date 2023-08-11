const {sequelize, users} = require('../repo/db.js');

class reg {
    constructor (login, pass, nick) {
        this.login = login
        this.pass = pass
        this.nick = nick
        console.log('constructor executado')
    }

    static async createUser(info) {
        await sequelize.sync();
        const user = await users.findOne({
            where: {
                name: info.login,
            }
        });
        if (!user){
            const test = await users.create({
                name: info.login,
                password: info.pass,
                nick: info.nick
            });
            return (!!test);
        }
        console.log('no')
        return false;
    }
}

module.exports = reg