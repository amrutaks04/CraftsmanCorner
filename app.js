const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const Loginroute= require('./routes/loginRoute');
const vendorRoute= require('./routes/vendorRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');


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

app.listen(3000,()=>{
console.log("Connected to port 3000");
})