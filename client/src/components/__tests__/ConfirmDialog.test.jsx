import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "../ConfirmDialog";

describe("ConfirmDialog Component", () => {
  const defaultProps = {
    show: true,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it("does not render when show is false", () => {
    render(<ConfirmDialog {...defaultProps} show={false} />);
    expect(screen.queryByText(/Confirm Action/i)).not.toBeInTheDocument();
  });

  it("renders with the correct title and message", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to proceed?/i)).toBeInTheDocument();
  });

  it("calls onConfirm when the Yes button is clicked", () => {
    render(<ConfirmDialog {...defaultProps} />);
    const yesButton = screen.getByText(/Yes/i);
    fireEvent.click(yesButton);
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when the No button is clicked", () => {
    render(<ConfirmDialog {...defaultProps} />);
    const noButton = screen.getByText(/No/i);
    fireEvent.click(noButton);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("has correct button text", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });
});
