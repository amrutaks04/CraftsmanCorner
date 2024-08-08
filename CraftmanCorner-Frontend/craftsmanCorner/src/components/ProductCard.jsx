import { useDispatch } from "react-redux";
import { addProduct } from "../redux/wishListSlice";

const ProductCard =(props)=>{

    const dispatch = useDispatch();

    const handleAdd=()=>{
        dispatch(addProduct(props.item));
    }

    const{productName,productDes,category,price,image}=props.item;
    return (
        <div class='product-card'>
<img src={image}/>
<h3>{productName}</h3>
<p>{productDes}</p>
<div>{category}</div>
<div>Rs.{price}</div>
<button onClick={handleAdd}>Add to Wishlist</button>
        </div>
    )
    }
    export default ProductCard;