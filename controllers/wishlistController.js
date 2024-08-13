const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');


const addToCart = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if (role == 'user') {
            const cart = await Wishlist.findOne({ user_id: id });
            if (cart) {
                const index = cart.products.findIndex(products => products.product_id === req.body.products.product_id);
                if (index != -1) {
                    cart.products[index].quantity = req.body.products.quantity;
                    await cart.save();
                    return res.status(200).json({
                        message: "quantity updated"
                    })
                }
                else {
                    const updateCart = await Wishlist.findOneAndUpdate({ user_id: id }, {
                        $push: {
                            products: req.body.products
                        }
                    }, { new: true })

                    return res.status(200).json({
                        message: "updated"
                    })
                }
            }
            else {
                const addCart = await Wishlist.create({
                    user_id: id,
                    products: req.body.products
                })
                return res.status(200).json({
                    message: "added"
                })
            }
        }
        return res.status(404).json({ message: 'This is not a user' });

    } catch (err) {
        console.log(err);
    }
}


const getCart = async (req, res) => {
    try {
        const userCid = req.authId;

        const userFound = await Wishlist.findOne({ user_id: userCid });
        if (!userFound) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }
        let cartArray = [];
        let total = 0;
        for (let i = 0; i < userFound.products.length; i++) {
            const cart = userFound.products[i];
            const productDetail = await Product.findOne({ productId: cart.product_id });
            if (productDetail) {
                const subTotal = productDetail.price * cart.quantity;
                cartArray.push({
                    productName: productDetail.productName,
                    productDes: productDetail.productDes,
                    price: productDetail.price,
                    quantity: cart.quantity,
                    subTotal: subTotal,
                    vendorId: productDetail.vendorId,
                    image: productDetail.image,
                    vendorName: productDetail.vendorName,
                    productId:cart.product_id
                })
                total += subTotal;
            }
        }
        let totalArray = [cartArray, total];
        return res.status(200).json({
            "totalArray": totalArray
        });
    } catch (err) {
        console.log(err);
    }
}


const deleteProduct = async (req, res) => {
    try {
        const id = req.authId;
        const role = req.role;
        if (role == 'user') {
            const userFound = await Wishlist.findOne({ user_id: id });
            if (!userFound) {
                return res.status(404).json({ message: "Wishlist not found" });
            }
            else {
                if (userFound.products.length <= 1) {
                    if (userFound.products[0].product_id == req.params.product_id) {
                        await Wishlist.findOneAndDelete({ user_id: id });
                        return res.status(200).json({ message: " All products deleted" });
                    }
                    return res.status(200).json({ message: "productId not matched" });
                }
                else {
                    const delId = req.params.product_id;
                    const filtered = userFound.products.filter((e) => {
                        return e.product_id != delId;
                    })
                    userFound.products = filtered;
                    await userFound.save();
                    let initialL = userFound.products.length;
                    let finalL = filtered.length;


                    if (initialL == finalL) {
                        return res.status(200).json({ message: " Product Deleted" });
                    }
                    else {
                        return res.status(200).json({ message: "Product not deleted" });
                    }
                }
            }
        }
        return res.status(404).json({ message: 'This is not a user' });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { addToCart, getCart, deleteProduct };