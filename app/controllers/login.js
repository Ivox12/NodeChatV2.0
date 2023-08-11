const path = require('path');
const models = require(path.resolve('./app/models/login.js'));

function hashCode(s) {
    return s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}

async function logController(req, res){
    console.log(res);
    req.body.pass = hashCode(req.body.pass);
    const info = new models(req.body.log, req.body.pass);
    
    let user = await models.getUser(info);
    if(user){
        res.status(200).json({message: 'autenticate', nick: user, path: '/chat'})
        console.log('ok')
    }
    else {
        res.status(401).json({message:'not in register'})
        console.log('no');
    }
}

module.exports = logController;