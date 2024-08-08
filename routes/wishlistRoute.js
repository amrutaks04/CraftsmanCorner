const wishlistController = require('../controllers/wishlistController');
const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

Router.post('/addcart',auth,wishlistController.addToCart);
Router.get('/getcart',auth,wishlistController .getCart);
Router.delete('/deleteProCart/:product_id',auth,wishlistController . deleteProduct );

module.exports = Router;
