import axios from 'axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';


const WishListCard =(props)=>{
    const token = useSelector((state)=>state.user.token);
const [quantity,setQuantity] = useState(props.item.quantity||1);


useEffect(()=>{
    console.log(quantity)
},[quantity])

    const incrementItem =async()=>{
const payload ={
    products:{
        product_id:props.item.productId,
        quantity:quantity+1
    }
}
try{
    const res =  await axios.post("http://localhost:3000/cart/addcart",
        payload,
        {
            headers:{Authorization:`Bearer ${token}`},
        }
    )
    setQuantity(quantity+1);
    toast.success('Item incremented')
    // console.log('res',res);
}catch(error){
    toast.error(error.response.data.message)
}
    }

   const decrementItem = async()=>{
    const payload ={
        products:{
            product_id:props.item.productId,
            quantity:quantity-1
        }
    }

        try{
if(quantity<=1){
    const res = await axios.delete(`http://localhost:3000/cart/deleteProCart/${props.item.productId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
        toast.success('Item removed from wishlist');
}else{
    const res =  await axios.post("http://localhost:3000/cart/addcart",
        payload,
        {
            headers:{Authorization:`Bearer ${token}`},
        }
    )
    setQuantity(quantity-1);
    toast.success('Item quantity decreased');
 }
        }catch(error){
 toast.error(error.response.data.message)
        }
    }
   


    return(
<div class='cart'>
        <div class='cart-layout'>
        <div className="cart-img">      
                <img src={props.item.image} />   
                </div>
               <div class='cart-content'>
               <p>{props.item.productName}</p>
               <p>{props.item.vendorName}</p>
                <button onClick={incrementItem}>+</button>&nbsp;
                {quantity||1}&nbsp;
                <button onClick={decrementItem}>-</button>
                <p>{props.item.price}</p>
               </div>
        </div>
</div>
    )
}

export default WishListCard;