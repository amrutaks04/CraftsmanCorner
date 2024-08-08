import {products} from '../constants';
import ProductCard from './ProductCard';
const Products =()=>{
return (
<div class='product-container'>
{products.map((item)=>
    <ProductCard key={item.id} item={item}/>
)}
</div>
)
}
export default Products;