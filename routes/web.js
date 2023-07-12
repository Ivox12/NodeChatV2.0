const express = require('express');
const routes = express.Router();
const path = require('path');

// Rota para a página inicial (home)
routes.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/views/home.html'));
});

routes.get('/chat', (req, res) => {
    res.sendFile(path.resolve('./app/views/chat.html'));
});


module.exports = routes;