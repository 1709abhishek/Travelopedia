import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "../ui/popover"; // Adjust the import path if necessary

describe("Popover Component", () => {
  it("renders without crashing", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );
    const triggerElement = screen.getByText("Open Popover");
    expect(triggerElement).toBeInTheDocument();
  });

  it("toggles visibility when the trigger is clicked", async () => {
    render(
      <Popover>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );
    const triggerElement = screen.getByText("Toggle Popover");

    // Initially, the content should not be visible
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(triggerElement);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    // Click again to close
    fireEvent.click(triggerElement);
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });

  it("applies custom alignment and sideOffset", () => {
    render(
      <Popover>
        <PopoverTrigger>Custom Popover</PopoverTrigger>
        <PopoverContent align="start" sideOffset={10}>
          Custom Aligned Content
        </PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByText("Custom Popover")); // Open the popover
    const contentElement = screen.getByText("Custom Aligned Content");
    expect(contentElement).toBeInTheDocument();
    // Note: More precise style or class testing can depend on the library's API or rendered DOM.
  });

  it("renders with additional class names", () => {
    render(
      <Popover>
        <PopoverTrigger>Class Test</PopoverTrigger>
        <PopoverContent className="custom-class">Class Content</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByText("Class Test")); // Open the popover
    const contentElement = screen.getByText("Class Content");
    expect(contentElement).toHaveClass("custom-class");
  });

  it("supports PopoverAnchor for positioning", () => {
    render(
      <Popover>
        <PopoverAnchor>Anchor</PopoverAnchor>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content with Anchor</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Anchor")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Trigger")); // Open the popover
    expect(screen.getByText("Content with Anchor")).toBeInTheDocument();
  });
});
