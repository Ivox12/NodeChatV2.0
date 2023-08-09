const path = require('path');
const models = require(path.resolve('./app/models/login.js'));
const express = require('express');

function logController(req, res){
    console.log(req.body);
}

module.exports = logController;