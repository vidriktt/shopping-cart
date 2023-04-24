import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = ({ cart }) => {
    let cartAmount = 0;
    
    if (cart) {
        cart.forEach(item => {
            cartAmount += item[1];
        });
    }

    return (
        <>
            <ul id="navbar">
                <li><Link to="/" class="active">HOME</Link></li>
                <li><Link to="/products">PRODUCTS</Link></li>
                <li><Link to="/cart">CART <span id="navbar-total">{cartAmount}</span></Link></li>
            </ul>
        </>
    );
}

export default Navbar;
