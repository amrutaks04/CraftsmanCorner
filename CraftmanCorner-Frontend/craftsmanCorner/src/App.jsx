import Header from './components/Header';
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App =()=>{
  return(
  <BrowserRouter>
  <ToastContainer />
<Header/>
  <Routes>
  <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<h2>Home</h2>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/proDes' element={<h2>Product Desc</h2>}/>
    <Route path='/wishlist' element={<h2>Wishlist</h2>}/>
    <Route path='/profile' element={<h2>profile</h2>}/>
    <Route path='/orders' element={<h2>Orders</h2>}/>
    <Route path='/inbox' element={<h2>Inbox</h2>}/>
    <Route path='/login' element={<Login/>}/>

  </Routes>
  </BrowserRouter>
  )
}
export default App;