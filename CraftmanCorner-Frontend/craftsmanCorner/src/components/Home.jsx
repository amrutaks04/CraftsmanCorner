import Header from './Header';

import { Link } from 'react-router-dom';
const Home =()=>{
 
 return(
<>

<div className="home-layout">
    <img src='images\login-img.jpeg' className="home-img"/>
    <p>"Handmade with Heart, Delivered with Care...Where Every Purchase Tells a Story"</p>
   <Link to='/login'> <button>Get Started!</button></Link>
</div>
</>
    )
}
export default Home;