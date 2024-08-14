import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/wishListSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard =(props)=>{

const cartItems = useSelector((state)=>state.wishlist.myList);
const isInCart = cartItems.find((el)=>el.productId===props.item.productId);
const token =useSelector((state)=>state.user.token);
const role = localStorage.getItem("role");

    const dispatch = useDispatch();
    console.log("item",props.item);

    const handleAdd=async()=>{

        const payload={
            "products":{
                "product_id":props.item.productId,
                "quantity":1
            }
        }

        const res= await axios.post('http://localhost:3000/cart/addcart',
            payload,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        dispatch(addProduct(props.item));
    }

    const{productName,productDes,category,price,image,vendorName}=props.item;
    return (
        <div class='product-card'>
<img src={image}/>
<h3>{productName}</h3>
<p>{productDes}</p>
<div className="pro-category"><b>Category:</b>{category}</div>
<div className="pro-price">Rs.{price}</div>
<div id='vendorName-div'><span><b>{vendorName} </b></span>'s Product</div>
{role==='user' && (
isInCart?( <Link to='/wishlist'><button className="go-to-cart-button">Go to Cart</button></Link>):
    ( <button onClick={handleAdd}>Add to Cart</button> )
)}

        </div>
    )
    }
    export default ProductCard;