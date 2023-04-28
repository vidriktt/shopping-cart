import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Products from '../components/Products';

describe("Navbar component", () => {
    it("renders correct navbar links", () => {
        render(<Navbar />, { wrapper: BrowserRouter });

        let links = screen.getAllByRole("link");

        expect(links[0].textContent).toMatch(/HOME/i);
        expect(links[1].textContent).toMatch(/PRODUCTS/i);
        expect(links[2].textContent).toMatch(/CART 0/i);
    });

    it("renders correct navbar links with working href", async () => {
        render(<Navbar />, { wrapper: BrowserRouter });

        const user = userEvent.setup();
        let links = screen.getAllByRole("link");

        expect(links[0]).toHaveAttribute("href", "/");
        await user.click(links[0]);
        expect(global.window.location.href.slice(-1)).toMatch("/");

        expect(links[1]).toHaveAttribute("href", "/products");
        await user.click(links[1]);
        expect(global.window.location.href).toContain("/products");

        expect(links[2]).toHaveAttribute("href", "/cart");
        await user.click(links[2]);
        expect(global.window.location.href).toContain("/cart");
    });

    it("renders correct cart amount number when products added to cart", async () => {
        const products = [{
            id: 1, title: "Test product 1", price: 9.99
        }]

        const cart = [[
            { id: 1, title: "Product 1", price: 9.99 }, 1, 1
        ]]

        function onClickAdd() {
            cart[0][1]++;
            rerender(<Products products={products} cart={cart} onClickAdd={onClickAdd} />, { wrapper: BrowserRouter });
        }

        const { rerender } = render(<Products products={products} cart={cart} onClickAdd={onClickAdd} />, { wrapper: BrowserRouter });

        const user = userEvent.setup();
        let cartLink = screen.getAllByRole("link")[2];
        let addToCartButton = screen.getByRole("button", { name: "Add to cart" });

        await user.click(addToCartButton);
        expect(cartLink.textContent).toMatch(/CART 2/i);

        await user.click(addToCartButton);
        await user.click(addToCartButton);
        expect(cartLink.textContent).toMatch(/CART 4/i);
    });
});