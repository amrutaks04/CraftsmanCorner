import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Header = () => {
    const wishList = useSelector((state) => state.wishlist.myList);
    const token = useSelector((state) => state.user.token);
    console.log('t',token)

    return (
        <header class='header'>
            <div class='header-left'>
                <p>Craftsman Corner</p>
            </div>
            <div class='header-right'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to='/wishlist'>WishList {wishList.length}</Link></li>
                    <li><Link to='/login'>{token?'Logout':'Login'}</Link></li>
                </ul>
            </div>
        </header>
    )

}
export default Header;