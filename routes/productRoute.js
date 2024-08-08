const productController = require('../controllers/productControler');
const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

Router.post('/createProduct',auth,productController.createProduct);
Router.put('/editProduct/:productId',auth,productController.editProduct);
Router.delete('/deleteProduct/:productId',auth,productController.deleteProduct);
Router.get('/getProduct',auth,productController.getProduct);
Router.get('/getAllProducts',productController.getAllProducts);


module.exports = Router;
