const path = require('path');
const models = require(path.resolve('./app/models/login.js'));
const jwt = require('jsonwebtoken');

function hashCode(s) {
    return s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}

async function logController(req, res){
    req.body.pass = hashCode(req.body.pass);
    const info = new models(req.body.log, req.body.pass);
    
    let user = await models.getUser(info);
    if(user){
        const payload = {nick: user.nick};
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, {maxAge:600000, httpOnly: true});
        res.status(200).json({message: 'autenticate', infoUser: user, path: '/chat', JWT: token})
        console.log('log.js, ok')
    }
    else {
        res.status(401).json({message:'not in register'})
        console.log('log.js, no');
    }
}

module.exports = logController;