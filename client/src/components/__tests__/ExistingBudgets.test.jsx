import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import ExistingBudgets from "../ExistingBudgets";
import { useBudgets } from "@/hooks/useBudgets";

// Mock the useBudgets hook
jest.mock("@/hooks/useBudgets", () => ({
  useBudgets: jest.fn(),
}));

describe("ExistingBudgets Component", () => {
  let mockGetBudgets;
  let mockDeleteBudget;
  let mockRefreshFlag;

  beforeEach(() => {
    mockGetBudgets = jest.fn();
    mockDeleteBudget = jest.fn();
    mockRefreshFlag = jest.fn();

    useBudgets.mockReturnValue({
      getBudgets: mockGetBudgets,
      deleteBudget: mockDeleteBudget,
      refreshFlag: mockRefreshFlag,
    });
  });

  test("renders total price and empty message when no budgets exist", async () => {
    mockGetBudgets.mockResolvedValueOnce([]); // No budgets returned

    render(<ExistingBudgets />);

    expect(await screen.findByText("$0.00")).toBeInTheDocument(); // Total price
    expect(
      await screen.findByText(/create budgets for your itinerary/i)
    ).toBeInTheDocument(); // Empty message
  });

  test("renders budgets and calculates total price", async () => {
    const budgetsMock = [
      [
        { budget: { budgetID: 1, type: "custom", price: 100 }, price: 100, name: "Flight" },
      ],
      [
        { budget: { budgetID: 2, type: "accommodation", price: 200 }, price: 200, name: "Hotel" },
      ],
    ];
    mockGetBudgets.mockResolvedValueOnce(budgetsMock);
  
    render(<ExistingBudgets />);
  
    // Validate total price and budget items
    expect(await screen.findByText("$300.00")).toBeInTheDocument(); // Total price
    expect(await screen.findByText(/budget price: \$100/i)).toBeInTheDocument();
    expect(await screen.findByText(/budget price: \$200/i)).toBeInTheDocument();
  });
  
  

  test("handles delete budget action", async () => {
    const budgetsMock = [
      [
        { budget: { budgetID: 1, type: "custom", price: 100 }, name: "Flight" },
      ],
      [
        { budget: { budgetID: 2, type: "accommodation", price: 200 }, name: "Hotel" },
      ],
    ];
    mockGetBudgets.mockResolvedValueOnce(budgetsMock);
    mockDeleteBudget.mockResolvedValueOnce({ success: true });

    render(
      <>
        <ExistingBudgets />
        <ToastContainer />
      </>
    );

    // Wait for budgets to load
    expect(await screen.findByText(/budget price: \$100/i)).toBeInTheDocument();
    expect(await screen.findByText(/budget price: \$200/i)).toBeInTheDocument();

    // Click delete button for the first budget
    const deleteButton = screen.getAllByText(/delete/i)[0];
    fireEvent.click(deleteButton);

    // Verify deleteBudget is called
    await waitFor(() => {
      expect(mockDeleteBudget).toHaveBeenCalledWith(1, "custom");
    });

    // Verify the toast message
    expect(
      await screen.findByText(/budget deleted successfully/i)
    ).toBeInTheDocument();
  });

  test("shows error toast if delete fails", async () => {
    const budgetsMock = [
      [
        { budget: { budgetID: 1, type: "custom", price: 100 }, name: "Flight" },
      ],
    ];
    mockGetBudgets.mockResolvedValueOnce(budgetsMock);
    mockDeleteBudget.mockResolvedValueOnce({ success: false, message: "Delete failed" });

    render(
      <>
        <ExistingBudgets />
        <ToastContainer />
      </>
    );

    // Wait for budgets to load
    expect(await screen.findByText(/budget price: \$100/i)).toBeInTheDocument();

    // Click delete button
    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    // Verify deleteBudget is called
    await waitFor(() => {
      expect(mockDeleteBudget).toHaveBeenCalledWith(1, "custom");
    });

    // Verify the error toast message
    expect(await screen.findByText(/delete failed/i)).toBeInTheDocument();
  });
});
