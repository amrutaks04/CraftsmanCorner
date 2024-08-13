const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const Loginroute= require('./routes/loginRoute');
const vendorRoute= require('./routes/vendorRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');
const wishlistRoute = require('./routes/wishlistRoute');
const orderRoute = require('./routes/orderRoute');


const app = express();

app.use(bodyparser.json());
app.use(cors());

mongoose.connect( 'mongodb+srv://amruta:amruta14@cluster0.rgbuaxs.mongodb.net/CraftsmanCorner?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('MongoDB Connected');
})
app.set('view engine','ejs');

app.use('/',Loginroute);
app.use('/vendor',vendorRoute);
app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/cart',wishlistRoute);
app.use('/order',orderRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Connected to port ${PORT}`);
})