const express = require('express');
const http = require('http');
const socket = require('socket.io');
const routes = require('./routes/web.js')

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(__dirname + '/public'));

app.use(routes);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});