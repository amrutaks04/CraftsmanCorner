import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";

const ProductForm = () => {

    const [productName, setProductName] = useState("");
    const [productDes, setProductDes] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const navigate=useNavigate();

    const token = useSelector((state)=>state.user.token);

    const authId = localStorage.getItem("authId");


    const handleProductName = (e) => {
        setProductName(e.target.value);
    }
    const handleProductDes = (e) => {
        setProductDes(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleImage = (e) => {
        setImage(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const payload = {
            productName:productName,
            productDes:productDes,
            category:category,
            price:price,
            image:image,
            vendorId:authId,
        }

        try {
            const res = await axios.post('https://craftsmancorner-1.onrender.com/product/createProduct',
                payload,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                })

            toast.success(res.data.message)
            navigate('/products');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="vendor-product-form">
            <form className="product-form" onSubmit={handleAddProduct}>
                <label htmlFor="name" required>Product Name:</label>
                <input type='text' id='name' value={productName} onChange={handleProductName} />
                <br />
                <label htmlFor="des">Product Description:</label>
                <input type='text' id='des' value={productDes} onChange={handleProductDes} />
                <br />
                <label htmlFor="des" required>Price:</label>
                <input type='number' id='des' value={price} onChange={handlePrice} />
                <br />
                <label htmlFor="des">Image:</label>
                <input type='text' id='des' value={image} onChange={handleImage} />
                <br />
                <label htmlFor="category">Category:</label>
    <select id='category' value={category} onChange={handleCategory}>
    <option value=''>Select Category</option>

                    <option value='Handmade Jewelry'>Handmade Jewelry</option>
                    <option value="Pottery and Ceramics">Pottery and Ceramics</option>
                    <option value="Textiles and Fabrics">Textiles and Fabrics</option>
                    <option value="Woodworking and Carpentry">Woodworking and Carpentry</option>
                    <option value="Leather Goods">Leather Goods</option>
                    <option value="Metalworks">Metalworks</option>
                    <option value="Paintings and Fine Art">Paintings and Fine Art</option>
                </select>
                <br/>
                <button className="create-button" type='submit'>Create</button>
            </form>
        </div>
    )
}
export default ProductForm;