
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VendorProduct = () => {
    const [product, setProductList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        productName: "",
        productDes: "",
        category: "",
        price: "",
        image: "",
        productId: ""
    });

    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get('https://craftsmancorner-1.onrender.com/product/getProduct',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProductList(res.data.products);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const editProduct = (i) => {
        setCurrentProduct({...i});
        setEdit(true);
    }

    const handleInputChange = (e) => {
        setCurrentProduct({
            ...currentProduct,
            [e.target.name]: e.target.value,
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            productName: currentProduct.productName,
            productDes: currentProduct.productDes,
            category: currentProduct.category,
            price: currentProduct.price,
            image: currentProduct.image,
        };
        const productId =currentProduct.productId;

        try {
            const res = await axios.put(`https://craftsmancorner-1.onrender.com/product/editProduct/${productId}`,
                payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.status === 200) {
                getProducts();
                setEdit(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleDelete=async(productId)=>{
        try{
const res = await axios.delete(`https://craftsmancorner-1.onrender.com/product/deleteProduct/${productId}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
if(res.status===200){
    getProducts();
    toast.success(res.data.message);
}
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className='vendor-product'>
                <h2>View Products</h2>
                {product.length > 0 ? (
                    product.map((i) => (
                        <div key={i.productId}>
                            <h4>Name:{i.productName}</h4>
                            <p>Description:{i.productDes}</p>
                            <div>Rs.{i.price}</div>
                            <div>Category:{i.category}</div>
                            <img src={i.image} alt={i.productName} />
                            <span>
                            <button onClick={() => editProduct(i)} id='edit-button'>Edit</button>
                            <button onClick={()=>handleDelete(i.productId)} id='delete-button'>Delete</button>
                            </span>
                        </div>
                    ))
                ) : (<p>No products found</p>)}
            </div>

            {edit && (
                <div className="edit-form">
                    <h2>Edit Product</h2>
                    <form onSubmit={ handleEditSubmit}>
                        <label htmlFor="name" required>Product Name:</label>
                        <input type='text' id='name' name="productName" value={currentProduct.productName} onChange={handleInputChange} />
                        <br />
                        <label htmlFor="des">Product Description:</label>
                        <input type='text' id='des' name="productDes" value={currentProduct.productDes} onChange={handleInputChange} />
                        <br />
                        <label htmlFor="price" required>Price:</label>
                        <input type='number' id='price' name="price" value={currentProduct.price} onChange={handleInputChange} />
                        <br />
                        <label htmlFor="image">Image:</label>
                        <input type='text' id='image' name="image" value={currentProduct.image} onChange={handleInputChange} />
                        <br />
                        <label htmlFor="category">Category:</label>
                        <select id='category' name="category" value={currentProduct.category} onChange={handleInputChange}>
                            <option value=''>Select Category</option>
                            <option value='Handmade Jewelry'>Handmade Jewelry</option>
                            <option value="Pottery and Ceramics">Pottery and Ceramics</option>
                            <option value="Textiles and Fabrics">Textiles and Fabrics</option>
                            <option value="Woodworking and Carpentry">Woodworking and Carpentry</option>
                            <option value="Leather Goods">Leather Goods</option>
                            <option value="Metalworks">Metalworks</option>
                            <option value="Paintings and Fine Art">Paintings and Fine Art</option>
                        </select>
                        <br />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEdit(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default VendorProduct;
