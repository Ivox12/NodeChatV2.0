const path = require('path');
const models = require(path.resolve('./app/models/register.js'));

function hashCode(s) {
    return s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}

function validate(str){
    if(str == null || str == '' || str.includes(' ')){
        return false;
    }
    else {
        return true;
    }
}

async function regController(req, res){
    console.log(req.body);
    let registered;
    if(validate(req.body.log) && validate(req.body.pass) && validate(req.body.nick)){
        req.body.pass = hashCode(req.body.pass);
        const info = new models(req.body.log, req.body.pass, req.body.nick);
        registered = await models.createUser(info);
    }
    
    switch(registered){
        case 1:
            console.log('nick"existente"')
            res.status(400).json({id:1, error:'!!Nick existente!!'})
            break;
        case 2: 
            console.log('login"existente"')
            res.status(400).json({id:2, error:'!!Login existente!!'})
            break;
        case 3:
            console.log('success')
            res.status(201).json({id:3, success:'!!Criado com sucesso!!'})
            break;
        default:
            console.log('deu ruim');
            res.status(400).json({id:null , error:'Falha no cadastro'})
            break;
    }
}

module.exports = regController;