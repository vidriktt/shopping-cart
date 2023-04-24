import React, { useState, useEffect } from "react";
import '../styles/Cart.css';
import Navbar from '../components/Navbar';

const Cart = ({ cart, onChangeQuantity, onClickRemove }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;

        cart.forEach(item => {
            newTotal += item[0].price * item[1];
        });

        setTotal(newTotal.toFixed(2));
    }, [cart]);

    return (
        <>
            <Navbar cart={cart} />

            <div id="cart">
                {cart.length === 0 ? (
                    <h2>Cart is empty.</h2>
                ) : (
                    <div>
                        <div id="cart-grid">
                            {cart.map((item) => {
                                return <div key={item[0].id} className="cart-div">
                                    <img src={"images/product_icon.png"} alt={"product_icon"} />
                                    <h4>{item[0].title}</h4>
                                    <h5>{item[0].price}</h5>
                                    <div className="button-div">
                                        <input type="number" id={"quantity-product-" + item[0].id} name="quantity" min="1" value={item[1]} onChange={e => onChangeQuantity(e.target)} /><br />
                                        <button id={"button-product-" + item[0].id} onClick={e => onClickRemove(e.target)}>Remove from cart</button>
                                    </div>
                                </div>
                            })}
                        </div>

                        <div id="cart-footer">
                            <h3>Total: <span id="total-sum">{total}</span></h3>
                            <button onClick={() => { alert("Thank You!") }}>BUY</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
