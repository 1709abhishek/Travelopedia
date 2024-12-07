import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../ui/textarea";

describe("Textarea Component", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<Textarea className={customClass} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass(customClass);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("accepts and displays placeholder text", () => {
    const placeholder = "Type something...";
    render(<Textarea placeholder={placeholder} />);
    const textarea = screen.getByPlaceholderText(placeholder);
    expect(textarea).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const inputValue = "Hello, world!";
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    await user.type(textarea, inputValue);
    expect(textarea).toHaveValue(inputValue);
  });

  it("is disabled when `disabled` prop is set", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("applies additional props", () => {
    const testId = "custom-id";
    render(<Textarea data-testid={testId} />);
    const textarea = screen.getByTestId(testId);
    expect(textarea).toBeInTheDocument();
  });
});
