const express = require('express');
const routes = express.Router();
const path = require('path');
const chatMiddleware = require('../app/middleware/chat');
const logController = require(path.resolve('./app/controllers/login.js'));
const regController = require(path.resolve('./app/controllers/register.js'));
const chatController = require(path.resolve('./app/controllers/chat.js'));
routes.use(express.json());

routes.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/views/home.html'));
});
routes.post('/login', logController);
routes.post('/register', regController);
routes.get('/chat', chatMiddleware, chatController.chatController);

routes.get('*', (req, res) => {
    res.sendFile(path.resolve('./app/views/err.html'));
})


module.exports = routes;