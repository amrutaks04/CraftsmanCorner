import {products} from '../constants';
import ProductCard from './ProductCard';
import { useEffect,useState } from 'react';
import axios from 'axios';


const Products =()=>{

const [productList,setProductList] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async()=>{
        const res = await axios.get('https://craftsmancorner-1.onrender.com/product/getAllProducts');
        setProductList(res.data.products);
    }
return (
<div class='product-container'>
    
{productList.map((item)=>
    <ProductCard key={item.id} item={item}/>
)}
</div>
)
}
export default Products;