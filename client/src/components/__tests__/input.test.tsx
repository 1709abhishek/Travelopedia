import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../ui/input"; // Adjust the import path based on your folder structure

describe("Input Component", () => {
  it("renders the input component with default properties", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    );
  });

  it("applies additional className if provided", () => {
    render(<Input className="custom-class" placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("accepts the 'type' prop and renders correctly", () => {
    render(<Input type="password" />);
    const inputElement = document.querySelector('input[type="password"]');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });
  
  

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("responds to user input", async () => {
    render(<Input placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText("Type here");
    await userEvent.type(inputElement, "Hello, world!");
    expect(inputElement).toHaveValue("Hello, world!");
  });

  it("disables input when 'disabled' prop is passed", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });
});
