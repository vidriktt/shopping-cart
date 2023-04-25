import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import App from '../App';

describe("App component", () => {
    it("renders correct headings", () => {
        render(<App />, { wrapper: BrowserRouter });

        let headings = screen.getAllByRole("heading");

        expect(headings[0].textContent).toMatch(/Welcome/i);
        expect(headings[1].textContent).toMatch(/Buy our products, thanks./i);
    });
});