const path = require('path');
const jwt = require('jsonwebtoken');
// const models = require(path.resolve('./app/models/chat.js'));

const token = 'ajeitar sessionStorage';
const secret = process.env.JWT_SECRET;

async function chatController(req, res){
    console.log('chat.js');
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.error('Erro ao verificar o token:', err);
        } else {
          console.log('Token verificado com sucesso. Decodificado:', decoded);
          // res.sendFile(path.resolve('./app/views/chat.html'));
        }
    });
}

module.exports = chatController;