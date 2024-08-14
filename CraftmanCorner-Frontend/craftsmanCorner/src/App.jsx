import Header from './components/Header';
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from './components/ProductForm';
import VendorProfile from './components/VendorProfile';
import WishList from './components/Wishlist';
import UserProfile from './components/UserProfile';

const App =()=>{
  return(
  <BrowserRouter>
  <ToastContainer />
<Header/>
  <Routes>
  <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/wishlist' element={<WishList/>}/>
    <Route path='/vendorprofile' element={<VendorProfile/>}/>
    <Route path='/userprofile' element={<UserProfile/>}/>
    <Route path='/inbox' element={<h2>Inbox</h2>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/product-form' element={<ProductForm/>}/>


  </Routes>
  </BrowserRouter>
  )
}
export default App;