const Product = require('../models/productModel');
const Login = require('../models/loginModel');
const { v4: uuidv4 } = require('uuid');

const createProduct = async (req, res) => {
    const { productName, productDes, category, price, image } = req.body;
    const id = req.authId;
    const role = req.role;
    try {
        if (role == 'vendor') {
            const fetchVendor = await Login.findOne({id:id});
            console.log('vendorName',fetchVendor.vendorName);

            const product = await Product.create({
                vendorId: id,
                productId: uuidv4(),
                productName,
                productDes,
                category,
                price,
                image,
                vendorName:fetchVendor.vendorName
            })

        
            if (product) {
                return res.status(200).json({ message: 'Product created' });
            }
            else {
                return res.status(404).json({ message: 'Product not created' });
            }
        }
        return res.status(401).json({ message: 'This is not a vendor' });
    } catch (err) {
        console.log(err);
    }
}

const editProduct = async (req, res) => {
    const { productName, productDes, category, price, image } = req.body;
    const ids = req.authId;
    const role = req.role;
    const proId = req.params.productId;

    try {
        if (role == 'vendor') {
            const vendorPresent = await Product.findOne({ vendorId: ids });
            if (vendorPresent) {
                const edit = await Product.updateOne({ productId: proId }, {
                    $set: {
                        productName,
                        productDes,
                        category,
                        price,
                        image
                    }
                }, { new: true })

                if (edit) {
                    return res.status(200).json({ message: 'Product edited'});
                }
                else {
                    return res.status(404).json({ message: 'Product not edited' });
                }
            }
            return res.status(404).json({ message: 'Vendor id not found' });
        }
        return res.status(404).json({ message: 'This is not a vendor' });
    } catch (err) {
        console.log(err);
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const id=req.authId;
        const role=req.role;
        const proId=req.params.productId;
        if(role=='vendor'){
const vendorPresent = await Product.findOne({vendorId:id});
if(vendorPresent){
    const deletePro = await Product.deleteOne({productId:proId});

    if(deletePro.deletedCount>0){
        return res.status(200).json({message:'Product deleted'});
    }
    else{
        return res.status(404).json({message:'Product not deleted'});
    }
}
return res.status(404).json({ message: 'Vendor id not found' });
        }
        return res.status(404).json({message:'This is not a vendor'});
    }catch(err){
        console.log(err);
    }
}

const getProduct = async(req,res)=>{
    try{
const id=req.authId;
const role=req.role;
if(role=='vendor'){
const vendorPresent =await Product.find({vendorId:id});

if(vendorPresent.length>0){
    const productArr = vendorPresent.map((i)=>{
        return({
            productId:i.productId,
            productName:i.productName,
            productDes:i.productDes,
            price:i.price,
            category:i.category,
            image:i.image,
        })
    })
    console.log(productArr)

        return res.status(200).json({message:"Products found",products:productArr});
}
    else{
        return res.status(404).json({message:'Products not found'});
    }

}
 else{
    return res.status(404).json({message:'This is not a vendor'});

}
    }catch(err){
        console.log(err);
    }
}

const getAllProducts = async(req,res)=>{
    const products = await Product.find();
    if(products){
        return res.status(200).json({message:"All products retrieved",products});
    }
return res.status(404).json({message:'Products not retrieved'});
}

module.exports = { createProduct, editProduct,deleteProduct,getProduct,getAllProducts };