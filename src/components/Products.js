import '../styles/Products.css';
import Navbar from '../components/Navbar';

const Products = ({ cart, products, onClickAdd }) => {
    return (
        <>
            <Navbar cart={cart} />

            <div id="products">
                <div id="products-grid">
                    {products.map((item) => {
                        return <div key={item.id} className="product-div">
                            <img src={"images/product_icon.png"} alt={"product_icon"} />
                            <h4>{item.title}</h4>
                            <h5>{item.price}</h5>
                            <div className="button-div">
                                <input type="number" id={"quantity-product-" + item.id} name="quantity" min="1" defaultValue="1" /><br />
                                <button id={"button-product-" + item.id} onClick={e => onClickAdd(e.target)}>Add to cart</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

export default Products;
