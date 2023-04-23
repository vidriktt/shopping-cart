import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <ul>
                <li><Link to="/" class="active">HOME</Link></li>
                <li><Link to="/products">PRODUCTS</Link></li>
                <li><Link to="/cart">CART</Link></li>
            </ul>
        </>
    );
}

export default Navbar;
