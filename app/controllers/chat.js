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
    socket.on('init',(info) => {
      const secret = process.env.JWT_SECRET
      const token = info;
    
      jwt.verify(token, secret,(err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
        } else {
            console.log('Token verificado com sucesso. Decodificado:', decoded);
            tempUser = {sid: socket.id, uid: decoded.uid, nick: decoded.nick };
            onMessage = {time: pegarDataAtual(), uid: decoded.uid, nick: decoded.nick};
            users.push(tempUser);
            userList = getUserList(users);
            io.emit('attUser', userList);
            io.emit('userOn', onMessage);
        }
      });
    })
    socket.on('disconnect', () => {
      users = users.filter((info)=>{
        if (info.sid == socket.id){
          offMessage = {time: pegarDataAtual(), nick: info.nick};
          tempChat.push(offMessage);
          io.emit('userOff', offMessage);
        }
        return info.sid !== socket.id
      })
      userList = getUserList(users);
      io.emit('attUser', userList)
    })
  })
}

function getUserList(arr) {
  arr = arr.map(users => ({nick: users.nick, uid: users.uid}))
  return arr;
}

function pegarDataAtual(){
  var dataAtual = new Date();
  var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
  var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
  var ano = dataAtual.getFullYear();
  var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
  var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();

  var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto;
  return dataFormatada;
}

module.exports =  { chatController, socketController };
