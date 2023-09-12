const express = require('express');
const routes = express.Router();
const path = require('path');
const logController = require(path.resolve('./app/controllers/login.js'));
const regController = require(path.resolve('./app/controllers/register.js'));
const chatController = require(path.resolve('./app/controllers/chat.js'));
routes.use(express.json());

// Rota para a página inicial (home)
routes.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/views/home.html'));
});
routes.get('/chat', chatController);

routes.post('/login', logController);
routes.post('/register', regController);



module.exports = routes;