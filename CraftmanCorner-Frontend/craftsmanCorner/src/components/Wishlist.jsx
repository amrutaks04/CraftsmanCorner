import WishlistCard from "./WishlistCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const WishList =()=>{
const cartItems = useSelector((state)=>state.wishlist.myList);
const token = useSelector((state)=>state.user.token);

const [name,setName] = useState("");
const [phoneNo,setPhoneNo] = useState("");
const [address,setAddress] = useState("");
const [showForm, setShowForm] = useState(false);

const handleOrderClick =()=>{
    setShowForm(true);
}

const handleOrderSubmit = async()=>{
    const payload={
        custName:name,
        custAddress:address,
        custPhno:phoneNo
    }

    try{
const res = await axios.post("http://localhost:3000/order/createOrders",payload,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
toast.success(res.data.message);
    }catch(error){
        toast.error(error.res.data.message)
    }
}
return(
    <div className="wishlist-container">
        <h2>My Wishlist</h2>
        {cartItems.length==0?(
            <>Wishlist is empty</>
        ): (
            <div className="wishlist-items">
                    {cartItems.map((item) => (
        <WishlistCard key={item.productId} item={item} />
    ))}
                </div>
        )}
      
        {cartItems.length>0 &&   (
             <button onClick={handleOrderClick}>Order Now</button>)}

{showForm && (
    <div className="orderForm">
                <h2>Order Deatils :</h2>
                <label htmlFor="name">Name:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required/>
                <label htmlFor="phoneNo">Phone No:</label>
                <input type='number' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
                <label htmlFor="name">Address:</label>
                <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)}required/>
                <button onClick={handleOrderSubmit}> Submit Order</button>
        </div>
)}
            
</div>
)
}
export default WishList;