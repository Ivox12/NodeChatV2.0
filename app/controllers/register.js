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
    switch(registered){
        case 1:
            console.log('nick"existente"')
            res.status(400).json({error:'!!Nick existente!!'})
            break;
        case 2: 
            console.log('login"existente"')
            res.status(400).json({error:'!!Login Existente!!'})
            break;
        case 3:
            console.log('success')
            res.status(201).json({success:'!!Criado com sucesso!!'})
            break;
        case 4:
            console.log('deu ruim');
            res.status(400).json({error:'Falha no cadastro'})
            break;
    }
}

module.exports = regController;