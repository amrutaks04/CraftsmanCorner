import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { setList } from "../redux/wishListSlice";

const Header = () => {
    const wishlist = useSelector((state) => state.wishlist.myList);
    const token = useSelector((state) => state.user.token);
    const role = localStorage.getItem("role");

    const dispatch = useDispatch();
  
    useEffect(()=>{
        if(token){
          getCart();
        }
            },[token]);
          
            const getCart = async()=>{
              const res = await axios.get('http://localhost:3000/cart/getcart',
                {
                  headers:{
                    Authorization: `Bearer ${token}`
                  }
                }
              )
            dispatch(setList(res.data.totalArray[0])); 

            // console.log("total",res.data.totalArray[1]);
            }

const remove=()=>{
localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("authId");
}

    return (
        <header class='header'>
            <div class='header-left'>
                <p>Craftsman Corner</p>
            </div>
            <div class='header-right'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                    {role==='vendor'?(<li><Link to ='/product-form'>Create Product</Link></li>  ):
                    (<li><Link to='/wishlist'>WishList {wishlist.length}</Link></li>)}
                    {role=='vendor' && <li><Link to='/inbox'>Inbox</Link></li>}
                 
                 {role==='vendor'?(<li><Link to='/vendorprofile'>Profile</Link></li>):(
                    <li><Link to='/userprofile'>Profile</Link></li>
                 )}
                  
                    {token ? (
                        <li><Link to='/login'><button onClick={remove} id="logout-button">Logout</button></Link></li>
                    ) : (
                        <li><Link to='/login'>Login</Link></li>
                    )}
                </ul>
            </div>
        </header>
        

    )

}
export default Header;