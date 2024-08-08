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
        const res = await axios.get('http://localhost:3000/product/getAllProducts');
        console.log(res.data);
    }
return (
<div class='product-container'>
{products.map((item)=>
    <ProductCard key={item.id} item={item}/>
)}
</div>
)
}
export default Products;