const path = require('path');
const jwt = require('jsonwebtoken');
// const models = require(path.resolve('./app/models/chat.js'));


async function chatController(req, res){
  console.log('chat.js');
  res.sendFile(path.resolve('./app/views/chat.html')); 
}

function socketController(io){
  console.log('aop')
  let tempChat = [];
  let users = [];
  let userList = [];
  io.on('connect', (socket)=> {

    console.log('usuario conectado');
    socket.on('init', async (info) => {
      const secret = process.env.JWT_SECRET
      const token = info;
    
      jwt.verify(token, secret,(err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
        } else {
            console.log('Token verificado com sucesso. Decodificado:', decoded);
            tempUser = {sid: socket.id, nick: decoded.nick };
            users.push(tempUser)
            userList = getUserList(users);
            socket.emit('attUser', userList);
        }
      });
    })
    socket.on('disconnect', () => {
      users = users.filter((info)=>{
        if (info.sid == socket.id){
          console.log('desconectado%#%#%#%#', info)
        }
        return info.sid !== socket.id
      })
      userList = getUserList(users);
      socket.emit('attUser', userList)
    })
  })
}

function getUserList(arr) {
  arr = arr.map(users => users.nick)
  return arr;
}

module.exports =  { chatController, socketController };