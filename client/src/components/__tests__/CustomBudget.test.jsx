import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import CustomBudget from "../CustomBudget";
import { useBudgets } from "@/hooks/useBudgets";

// Mock the useBudgets hook
jest.mock("@/hooks/useBudgets", () => ({
  useBudgets: jest.fn(),
}));

describe("CustomBudget Component", () => {
  let mockCreateCustomBudget;
  let mockRefreshBudgets;

  beforeEach(() => {
    mockCreateCustomBudget = jest.fn();
    mockRefreshBudgets = jest.fn();

    useBudgets.mockReturnValue({
      createCustomBudget: mockCreateCustomBudget,
      refreshBudgets: mockRefreshBudgets,
    });
  });

  test("renders input fields and button", () => {
    render(<CustomBudget />);

    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByText(/\$/i)).toBeInTheDocument(); // Check for the "$" near the price input
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  test("updates state when inputs change", () => {
    render(<CustomBudget />);

    const itemNameInput = screen.getByLabelText(/item name/i);
    const priceInput = screen.getByRole("spinbutton"); // Target the input with type="number"

    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(priceInput, { target: { value: "100" } });

    expect(itemNameInput.value).toBe("Test Item");
    expect(priceInput.value).toBe("100");
  });

  test("calls createCustomBudget and refreshBudgets on save", async () => {
    render(
      <>
        <CustomBudget />
        <ToastContainer />
      </>
    );

    const itemNameInput = screen.getByLabelText(/item name/i);
    const priceInput = screen.getByRole("spinbutton");
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(priceInput, { target: { value: "150" } });
    fireEvent.click(saveButton);

    // Ensure async actions like toast and refresh are handled
    await waitFor(() => {
      expect(mockCreateCustomBudget).toHaveBeenCalledWith({
        itineraryID: 104,
        type: "custom",
        name: "Test Item",
        price: "150",
      });
      expect(mockRefreshBudgets).toHaveBeenCalled();
      expect(screen.getByText(/custom budget saved successfully/i)).toBeInTheDocument();
    });
  });

//   test("displays loader while saving", async () => {
//     // Mock useState to control the loading state
//     jest.spyOn(React, "useState")
//       .mockImplementationOnce(() => [true, jest.fn()]) // Mock loading as true initially
//       .mockImplementationOnce(() => [false, jest.fn()]); // Mock loading as false after save
  
//     render(<CustomBudget />);
  
//     // Click Save button
//     const saveButton = screen.getByText(/save/i);
//     fireEvent.click(saveButton);
  
//     // Check for the loader's presence
//     const loader = await screen.findByText((_, element) => {
//       const style = window.getComputedStyle(element);
//       return style.position === "fixed" && style.zIndex === "1000";
//     });
  
//     expect(loader).toBeInTheDocument();
  
//     jest.restoreAllMocks(); // Cleanup the mock
//   });
  
});
