const express = require('express');
const routes = express.Router();
const path = require('path');
const chatMiddleware = require('../app/middleware/chat');
const logController = require(path.resolve('./app/controllers/login.js'));
const regController = require(path.resolve('./app/controllers/register.js'));
const chatController = require(path.resolve('./app/controllers/chat.js'));
routes.use(express.json());

// Rota para a página inicial (home)
routes.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/views/home.html'));
});
routes.get('/chat', chatMiddleware, chatController);

routes.post('/login', logController);
routes.post('/register', regController);



module.exports = routes;