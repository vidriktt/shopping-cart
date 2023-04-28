/* eslint-disable testing-library/no-node-access */
import { render, within, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/Products';

describe("Products component", () => {
    it("renders product cards correctly", () => {
        const products = [
            { id: 1, title: "Test product 1", price: 1.99 },
            { id: 2, title: "Test product 2", price: 2.99 },
            { id: 3, title: "Test product 3", price: 3.99 }
        ];

        render(<Products products={products} />, { wrapper: BrowserRouter });

        const cards = screen.getAllByTestId("product-div");

        expect(cards).toHaveLength(3);
        expect(cards[0].children[0].alt).toBe("product_icon");
        expect(cards[0].children[1].textContent).toBe("Test product 1");
        expect(cards[0].children[2].textContent).toBe("1.99");
        expect(within(cards[0]).getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
    });
});