import { useState ,useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Inbox =()=>{
    const [viewOrder,setViewOrder] = useState([]);
    const token = useSelector((state)=>state.user.token);

    useEffect(() => {
        fetchOrder();
      }, [token]);
    
      const fetchOrder = async () => {
        try {
          const res = await axios.get('http://localhost:3000/order/getVendorOrders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setViewOrder(res.data);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
    
    
return(
    <div className="user-orders">
    <h2>My Orders</h2>
    {viewOrder.length === 0 ? (
      <p>No orders found</p>
    ) : (
      viewOrder.map((order) => (
        <div key={order.order_id} className="order-card">
          <p><b>Order Id:</b>{order.order_id}</p>
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
          <p><b>Customer Name:</b>{order.customerName}</p>
          <p><b>Customer Address:</b>{order.customerAddress}</p>
          <p><b>Customer Phone No:</b>{order.customerPhone}</p>
        </div>
      ))
    )}
  </div>
)
}
export default Inbox;