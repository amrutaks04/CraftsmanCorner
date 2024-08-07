const userController = require('../controllers/userController');
const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

Router.post('/createUserProfile',auth,userController.createUserProfile);
Router.get('/viewUserProfile',auth,userController.viewUserProfile);
Router.put('/editUserProfile',auth,userController.editUserProfile);
Router.delete('/deleteUserProfile',auth,userController.deleteUserProfile);

module.exports = Router;
