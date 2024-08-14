import WishlistCard from "./WishlistCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const WishList = () => {
  const cartItems = useSelector((state) => state.wishlist.myList);
  const token = useSelector((state) => state.user.token);

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleOrderClick = () => {
    setShowForm(true);
  };

  const handleOrderSubmit = async () => {
    const payload = {
      custName: name,
      custAddress: address,
      custPhno: phoneNo,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/order/createOrders",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setShowForm(false); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {cartItems.length === 0 ? (
        <p>Wishlist is empty</p>
      ) : (
        <div className="wishlist-items">
          {cartItems.map((item) => (
            <WishlistCard key={item.productId} item={item} />
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <button onClick={handleOrderClick} className="order-button">
          Order Now
        </button>
      )}

      {showForm && (
        <div className="orderForm">
          <h2>Order Details:</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="phoneNo">Phone No:</label>
          <input type="text" id="phoneNo"  value={phoneNo}  onChange={(e) => setPhoneNo(e.target.value)} required />
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
          <button onClick={handleOrderSubmit}>Submit Order</button>
        </div>
      )}
    </div>
  );
};

export default WishList;
