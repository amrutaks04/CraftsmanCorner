const loginController = require('../controllers/loginController');
const express = require('express');
const Router= express.Router();

Router.post('/register',loginController.register);
Router.post('/login',loginController.login);

module.exports = Router;