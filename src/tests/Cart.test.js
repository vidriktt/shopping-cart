/* eslint-disable testing-library/no-node-access */
import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom'
import Cart from '../components/Cart';

const cart = [
    [{ id: 1, title: "Test product 1", price: 1.99 }, 1, 1],
    [{ id: 2, title: "Test product 2", price: 2.99 }, 5, 2],
    [{ id: 3, title: "Test product 3", price: 3.99 }, 2, 3]
];

describe("Cart component", () => {
    it("renders correct header when cart is empty", () => {
        render(<Cart cart={[]} />, { wrapper: BrowserRouter });

        expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Cart is empty.");
    });

    it("renders cart cards correctly", () => {
        render(<Cart cart={cart} />, { wrapper: BrowserRouter });

        const cards = screen.getAllByTestId("cart-div");

        expect(cards).toHaveLength(3);
        expect(cards[0].children[0].alt).toBe("product_icon");
        expect(cards[0].children[1].textContent).toBe("Test product 1");
        expect(cards[0].children[2].textContent).toBe("1.99");
        expect(within(cards[0]).getByRole("button", { name: "Remove from cart" })).toBeInTheDocument();
    });

    it("renders cart cards correctly when 'Remove from cart' is clicked", async () => {
        function onClickRemove() {
            rerender(<Cart cart={cart.slice(1)} />, { wrapper: BrowserRouter });
        }

        const { rerender } = render(<Cart cart={cart} onClickRemove={onClickRemove} />, { wrapper: BrowserRouter });

        const user = userEvent.setup();
        const removeButton = screen.getAllByRole("button", { name: "Remove from cart" })[0];

        await user.click(removeButton);

        expect(screen.getAllByTestId("cart-div")).toHaveLength(2);
    });

    it("renders cart total correctly", async () => {
        function onChangeQuantity() {
            const cartAdd = [
                [{ id: 1, title: "Test product 1", price: 1.99 }, 2, 1],
                [{ id: 2, title: "Test product 2", price: 2.99 }, 5, 2],
                [{ id: 3, title: "Test product 3", price: 3.99 }, 4, 3]
            ];

            rerender(<Cart cart={cartAdd} onChangeQuantity={onChangeQuantity} />, { wrapper: BrowserRouter })
        }

        const { rerender } = render(<Cart cart={cart} onChangeQuantity={onChangeQuantity} />, { wrapper: BrowserRouter });

        const user = userEvent.setup();
        const quantityInput = screen.getAllByRole("spinbutton");
        const totalHeading = screen.getByRole("heading", { level: 3 }).textContent;

        expect(totalHeading).toBe("Total: 24.92");
        expect(screen.getByRole("button", { name: "BUY" })).toBeInTheDocument();

        await user.type(quantityInput[0], "2");
        await user.type(quantityInput[2], "4");
        expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Total: 34.89");
    });
});