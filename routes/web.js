const express = require('express');
const routes = express.Router();
const path = require('path');
const logController = require(path.resolve('./app/controllers/login.js'));
routes.use(express.json());

// Rota para a página inicial (home)
routes.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/views/home.html'));
});

routes.post('/login', logController);

routes.get('/chat', (req, res) => {
    res.sendFile(path.resolve('./app/views/chat.html'));
});


module.exports = routes;