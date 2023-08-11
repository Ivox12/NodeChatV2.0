const path = require('path');
const models = require(path.resolve('./app/models/login.js'));

async function logController(req, res){
    const info = new models(req.body.log, req.body.pass);
    
    let auth = await models.getUser(info);
    if(auth){
        console.log('ok')
    }
    else {
        console.log('no');
    }
}

module.exports = logController;