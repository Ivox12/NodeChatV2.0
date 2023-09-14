const path = require('path');
const jwt = require('jsonwebtoken');


async function chatMiddleware(req, res){
    const secret = process.env.JWT_SECRET
    const token = req.cookies.token;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            return res.redirect('/');
        } else {
            console.log('Token verificado com sucesso. Decodificado:', decoded);
            res.sendFile(path.resolve('./app/views/chat.html'));
        }
    });
}

module.exports = chatMiddleware;