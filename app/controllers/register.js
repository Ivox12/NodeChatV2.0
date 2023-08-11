const path = require('path');
const models = require(path.resolve('./app/models/register.js'));

function hashCode(s) {
    return s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}

async function regController(req, res){
    console.log(req.body);
    req.body.pass = hashCode(req.body.pass);
    const info = new models(req.body.log, req.body.pass, req.body.nick);
    let registered = await models.createUser(info);
    if (registered){
        res.status(200).json({message:'success'});
    }
    else {
        res.status(400).json({message:'fail'})
    }
    
}

module.exports = regController;