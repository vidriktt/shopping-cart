import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <ul>
                <li><a class="active" href="/">HOME</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>
        </>
    );
}

export default Navbar;
