import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/wishListSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard =(props)=>{

const cartItems = useSelector((state)=>state.wishlist.myList);
const isInCart = cartItems.find((el)=>el.productId===props.item.productId);
const token =useSelector((state)=>state.user.token);

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
<div>{category}</div>
<div>Rs.{price}</div>
<div>{vendorName}</div>
{isInCart?( <Link to='/wishlist'><button>Go to Cart</button></Link>):
        ( <button onClick={handleAdd}>Add to Cart</button> )}
        </div>
    )
    }
    export default ProductCard;