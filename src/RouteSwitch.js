import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Products from "./components/Products";
import Cart from "./components/Cart";

const RouteSwitch = () => {
    const [cart, setCart] = useState([]);
    console.log(cart);

    const products = [
        {
            id: 1,
            title: "Product 1"
        },
        {
            id: 2,
            title: "Product 2"
        },
        {
            id: 3,
            title: "Product 3"
        },
        {
            id: 4,
            title: "Product 4"
        },
        {
            id: 5,
            title: "Product 5"
        },
        {
            id: 6,
            title: "Product 6"
        },
        {
            id: 7,
            title: "Product 7"
        },
        {
            id: 8,
            title: "Product 8"
        },
        {
            id: 9,
            title: "Product 9"
        }
    ];

    function onClickAdd(target) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id.toString() === target.id.split("-")[2]) {
                let match = false;

                cart.forEach(elem => {
                    console.log(elem.includes(products[i].id));
                    if (elem.includes(products[i].id)) {
                        setCart([
                            ...cart.slice(0, i),
                            [
                                elem,
                                parseInt(target.parentNode.childNodes[0].value) + 1,
                                products[i].id
                            ],
                            ...cart.slice(i + 1)
                        ])

                        match = true;
                    }
                });

                if (!match) {
                    setCart([...cart, [products[i], target.parentNode.childNodes[0].value, products[i].id]]);
                }
            }
        }
    }

    function onClickRemove(target) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id.toString() === target.id.split("-")[2]) {
                setCart([
                    ...cart.slice(0, i),
                    ...cart.slice(i + 1)
                ]);
            }
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/products" element={<Products products={products} onClickAdd={onClickAdd} />} />
                <Route path="/cart" element={<Cart cart={cart} onClickRemove={onClickRemove} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;