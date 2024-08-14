import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchOrder();
  }, [token]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get('https://craftsmancorner-1.onrender.com/order/getOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="user-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} className="order-card">
            <p><b>Total Amount:</b> Rs.{order.totAmount}</p>
            <p><b>Order Date:</b> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><b>Estimated Delivery:</b> {new Date(order.estDelivDate).toLocaleDateString()}</p>
            <h4>Products:</h4>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>
                  <img src={product.image} alt={product.title} />
                  <p><b>Title:</b> {product.title}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
