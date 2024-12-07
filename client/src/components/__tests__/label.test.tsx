import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "../ui/label"; // Adjust the path based on your folder structure

describe("Label Component", () => {
  it("renders the label with default styles", () => {
    render(<Label htmlFor="input-id">Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-sm font-medium leading-none");
  });

  it("accepts and applies additional className", () => {
    render(
      <Label htmlFor="input-id" className="text-red-500">
        Test Label
      </Label>
    );
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveClass("text-red-500");
  });

  it("is linked to the correct input via 'htmlFor'", () => {
    render(
      <>
        <Label htmlFor="input-id">Test Label</Label>
        <input id="input-id" />
      </>
    );
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveAttribute("for", "input-id");
  });

  it("is disabled when peer-disabled class is applied", () => {
    render(
      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Disabled Label
      </Label>
    );
    const labelElement = screen.getByText("Disabled Label");
    expect(labelElement).toHaveClass("peer-disabled:cursor-not-allowed");
    expect(labelElement).toHaveClass("peer-disabled:opacity-70");
  });

  it("forwards refs correctly", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref Test Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
