import '../styles/Cart.css';
import Navbar from '../components/Navbar';

const Cart = ({ cart, onClickRemove }) => {
    console.log(cart);

    return (
        <>
            <Navbar />

            <div id="cart">
                {cart.length === 0 ? (
                    <h2>Cart is empty.</h2>
                ) : (
                    <div id="cart-grid">
                        {cart.map((item) => {
                            return <div key={item[0].id} className="cart-div">
                                <img src={"images/product_icon.png"} alt={"product_icon"} />
                                <h4>{item[0].title}</h4>
                                <div className="button-div">
                                    <input type="number" id={"quantity-product-" + item[0].id} name="quantity" min="1" defaultValue={item[1]} /><br />
                                    <button id={"button-product-" + item[0].id} onClick={e => onClickRemove(e.target)}>Remove from cart</button>
                                </div>
                            </div>
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
