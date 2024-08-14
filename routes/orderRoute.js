const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');

const auth=require('../middlewares/auth');

Router.post('/createOrders',auth,orderController.placeOrder);
Router.get('/getOrders',auth,orderController.viewOrder);
Router.get('/getVendorOrders',auth,orderController.vendorViewOrder);


module.exports=Router;
