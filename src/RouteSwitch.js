import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Products from "./components/Products";
import Cart from "./components/Cart";

const RouteSwitch = () => {
    const [cart, setCart] = useState([]);

    const products = [
        {
            id: 1,
            title: "Product 1",
            price: 9.99
        },
        {
            id: 2,
            title: "Product 2",
            price: 14.99
        },
        {
            id: 3,
            title: "Product 3",
            price: 14.99
        },
        {
            id: 4,
            title: "Product 4",
            price: 12.99
        },
        {
            id: 5,
            title: "Product 5",
            price: 5.49
        },
        {
            id: 6,
            title: "Product 6",
            price: 199.99
        },
        {
            id: 7,
            title: "Product 7",
            price: 10.99
        },
        {
            id: 8,
            title: "Product 8",
            price: 9.99
        },
        {
            id: 9,
            title: "Product 9",
            price: 1.99
        }
    ];

    function onClickAdd(target) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id.toString() === target.id.split("-")[2]) {
                let match = false;

                for (let j = 0; j < cart.length; j++) {
                    if (cart[j][2].toString() === products[i].id.toString()) {
                        match = true;

                        setCart([
                            ...cart.slice(0, j),
                            [
                                cart[j][0],
                                cart[j][1] + parseInt(target.parentNode.childNodes[0].value),
                                cart[j][2]
                            ],
                            ...cart.slice(j + 1)
                        ])
                    }
                };

                if (!match) {
                    setCart([
                        ...cart, [products[i], parseInt(target.parentNode.childNodes[0].value), products[i].id]
                    ]);
                }
            }
        }
    }

    function onChangeQuantity(target) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i][2].toString() === target.id.split("-")[2]) {
                setCart([
                    ...cart.slice(0, i),
                    [
                        cart[i][0],
                        parseInt(target.value),
                        cart[i][2]
                    ],
                    ...cart.slice(i + 1)
                ])
            }
        }
    }

    function onClickRemove(target) {
        setCart(
            cart.filter(item =>
                item[2].toString() !== target.id.split("-")[2]
            )
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App cart={cart} />} />
                <Route path="/products" element={<Products products={products} cart={cart} onClickAdd={onClickAdd} />} />
                <Route path="/cart" element={<Cart cart={cart} onChangeQuantity={onChangeQuantity} onClickRemove={onClickRemove} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;