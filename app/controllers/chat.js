const path = require('path');
// const models = require(path.resolve('./app/models/chat.js'));


async function chatController(req, res){

  console.log('chat.js');
  res.sendFile(path.resolve('./app/views/chat.html'));
}

module.exports = chatController;