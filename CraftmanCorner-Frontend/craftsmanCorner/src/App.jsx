import Header from './components/Header';
import Products from './components/Products';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter,Route,Routes } from 'react-router-dom';


const App =()=>{
  return(
<Provider store={store}>
  <BrowserRouter>
<Header/>
  <Routes>
    <Route path='/login' element={<h2>Login</h2>}/>
    <Route path='/register' element={<h2>Register</h2>}/>
    <Route path='/home' element={<h2>Home</h2>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/proDes' element={<h2>Product Desc</h2>}/>
    <Route path='/wishlist' element={<h2>Wishlist</h2>}/>
    <Route path='/profile' element={<h2>profile</h2>}/>
    <Route path='/orders' element={<h2>Orders</h2>}/>
    <Route path='/inbox' element={<h2>Inbox</h2>}/>
  </Routes>
  </BrowserRouter>
</Provider>
  )
}
export default App;