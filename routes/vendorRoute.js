const vendorController = require('../controllers/vendorController');
const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

Router.post('/createVendorProfile',auth,vendorController.createProfile);
Router.put('/editVendorProfile',auth,vendorController.editProfile);
Router.get('/viewVendorProfile',auth,vendorController.viewProfile);
Router.delete('/deleteVendorProfile',auth,vendorController.deleteProfile);

module.exports = Router;