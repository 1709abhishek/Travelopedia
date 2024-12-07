import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Progress } from "../ui/progress"; // Adjust the path if necessary

describe("Progress Component", () => {
  it("renders without crashing", () => {
    render(<Progress value={50} />);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeInTheDocument();
  });

  it("applies the correct value", () => {
    render(<Progress value={75} />);
    const indicatorElement = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(indicatorElement).toHaveStyle("transform: translateX(-25%)");
  });

  it("renders with additional class names", () => {
    render(<Progress value={30} className="custom-class" />);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveClass("custom-class");
  });

  it("renders with default value when no value is provided", () => {
    render(<Progress />);
    const indicatorElement = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(indicatorElement).toHaveStyle("transform: translateX(-100%)"); // Default value of 0
  });

  it("renders with correct styles", () => {
    render(<Progress value={50} />);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveClass("relative h-2 w-full overflow-hidden rounded-full bg-primary/20");
  });
});
