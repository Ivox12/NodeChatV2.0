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
        const userLog = await users.findOne({
            where: {
                name: info.login,
            }
        });
        const userNick = await users.findOne({
            where: {
                nick: info.nick,
            }
        });
        if(userLog){
            return (2);
        }
        if(userNick){
            return (1);
        }
        else {
            try {
                await users.create({
                    name: info.login,
                    password: info.pass,
                    nick: info.nick
                });
                return (3);
            }
            catch {
                return (4);
            }
        }
    }
}

module.exports = reg