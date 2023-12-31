const express = require('express');
const http = require('http');
const socket = require('socket.io');
const routes = require('./routes/web.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
app.use(cookieParser());
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(__dirname + '/public'));

app.use(routes);

const PORT = 3000;
const chatController= require('./app/controllers/chat.js');
chatController.socketController(io);
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});