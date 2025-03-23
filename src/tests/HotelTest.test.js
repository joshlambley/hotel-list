import { render, screen, fireEvent } from "@testing-library/react";
import HotelList from "../src/App.js";

test("renders hotel list", async () => {
  // Render the HotelList component
  render(<HotelList />);
  
  // Check if "Hotels" heading appears
  expect(await screen.findByText("Hotels")).toBeInTheDocument();
});

test("sorts by price", async () => {
  render(<HotelList />);
  
  // Click the "Sort by Price" button
  fireEvent.click(screen.getByText("Sort by Price"));

  // Check if the button gets active styling
  expect(screen.getByText("Sort by Price").classList.contains("active")).toBeTruthy();
});

test("toggles description", async () => {
  render(<HotelList />);
  
  // Find and click the "Show Details" button
  const button = await screen.findByText("Show Details");
  fireEvent.click(button);

  // Check if hotel overview is displayed
  expect(screen.getByText(/overlooking the Atlantic Ocean/i)).toBeInTheDocument();
});