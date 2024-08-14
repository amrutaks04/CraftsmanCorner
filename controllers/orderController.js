const Order = require('../models/orderModel');
const Wishlist = require('../models/wishlistModel')
const Product = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');

const placeOrder = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if(role==='user'){
            const userFetch = await Wishlist.findOne({ user_id:id});
            console.log(userFetch);
            if (!userFetch) {
                return res.status(400).json({ message: "Cart is empty" });
            }
    
            const currDate = new Date();
            const estDate = new Date(currDate.setDate(currDate.getDate() + 10));
    
            let totalAm = 0;
            for (let i = 0; i < userFetch.products.length; i++) {
                let proId = userFetch.products[i];
                const total = await Product.findOne({productId: proId.product_id })
                if (total) {
                    totalAm += total.price * proId.quantity;
                }
            }
    
            const product = await Order.create({
                order_id: uuidv4(),
                user_id: id,
                custName: req.body.custName,
                custPhno: req.body.custPhno,
                custAddress: req.body.custAddress,
                estDelivDate: estDate,
                totAmount: totalAm,
                products: userFetch.products
            })
    
            await Wishlist.findOneAndDelete({ user_id:id});
            return res.status(200).json({ message: "Order created & Cart deleted" });
        }
        return res.status(401).json({message:'This is not a user'});

    } catch (err) {
        console.log(err);
    }
}

const viewOrder = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if(role==='user'){
            const orderPresent = await Order.find({ user_id:id });

            if (!orderPresent) {
                return res.status(400).json({ message: "No orders found" });
            }
    
            let finalArray = [];
            for (let order of orderPresent) {
                let orderArray = [];
                for (let proId of order.products) {
                    const product = await Product.findOne({ productId: proId.product_id  });
                    if (product) {
                        orderArray.push(
                            {
                                title: product.productName,
                                description: product.productDes,
                                image: product.image,
                                price: product.price,
                                totalPrice: order.totAmount,
                            }
                        )
                    }
                }
                finalArray.push({
                    products: orderArray,
                    totAmount: order.totAmount,
                    orderDate: order.orderDate,
                    estDelivDate: order.estDelivDate,
                    order_id: order.order_id
                })
            }
            return res.status(200).json(finalArray);
        }
return res.status(401).json({message:'This is not a user'});
    }  
    catch (err) {
        console.log(err);
    }
}

const vendorViewOrder = async(req,res)=>{
    try{
        const id = req.authId;
        const role = req.role;
        if(role==='vendor'){
const vendorPro = await Product.find({vendorId:id})
if(vendorPro.length ===0){
    return res.status(404).json({message:'No products found for this vendor'});
}
const vendorProId = vendorPro.map((products)=>products.productId);
const orderPresent = await Order.find({'products.product_id':{$in:vendorProId}});

if(orderPresent.length === 0){
    return res.status(404).json({message:'No orders found for this vendor\'s products'});
}

let finalArray = [];
for (let order of orderPresent) {
    let orderArray = [];
    for (let proId of order.products) {
        if (vendorProId.includes(proId.product_id)) {
            const product = vendorPro.find(prod => prod.productId === proId.product_id);
            if (product) {
                orderArray.push({
                    title: product.productName,
                    description: product.productDes,
                    image: product.image,
                    quantity: proId.quantity,
                    price: product.price,
                    totalPrice: product.price * proId.quantity
                });
            }
        }
    }
    finalArray.push({
        products: orderArray,
        totAmount: order.totAmount,
        orderDate: order.orderDate,
        estDelivDate: order.estDelivDate,
        order_id: order.order_id,
        customerName: order.custName,
        customerPhone: order.custPhno,
        customerAddress: order.custAddress
    });
}

return res.status(200).json(finalArray);
}
return res.status(401).json({message:'This is not a vendor'});

}
catch(error){
console.log(error);
    }
}

module.exports = { placeOrder, viewOrder,vendorViewOrder };