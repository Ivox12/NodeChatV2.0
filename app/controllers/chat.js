const path = require('path');
// const models = require(path.resolve('./app/models/chat.js'));


async function chatController(req, res){
  console.log('chat.js');
  res.sendFile(path.resolve('./app/views/chat.html')); 
}

function socketController(io){
  console.log('aop')
  io.on('connection', (socket)=> {

    socket.on("teste", (e) => {
      console.log(e);
    })
    console.log('usuario conectado');
  })


}

module.exports =  { chatController, socketController };