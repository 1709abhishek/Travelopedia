import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "../ui/sheet"; // Adjust the import path based on your file structure

describe("Sheet Component", () => {
  it("renders the Sheet component with trigger and content", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <button>Footer Button</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByText("Open Sheet");
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);

    const title = screen.getByText("Sheet Title");
    expect(title).toBeInTheDocument();

    const description = screen.getByText("Sheet Description");
    expect(description).toBeInTheDocument();

    const footerButton = screen.getByText("Footer Button");
    expect(footerButton).toBeInTheDocument();
  });

  it("closes the Sheet when the close button is clicked", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
          <SheetClose />
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByText("Open Sheet");
    fireEvent.click(trigger);

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    // Assuming Sheet disappears from the DOM after closing
    expect(screen.queryByText("Sheet Title")).not.toBeInTheDocument();
  });
  it("applies custom className to the SheetContent", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent className="custom-class">
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  
    const trigger = screen.getByText("Open Sheet");
    fireEvent.click(trigger);
  
    const sheetContent = screen.getByRole("dialog"); // Ensure you're targeting the correct container element
    expect(sheetContent).toHaveClass("custom-class");
  });
  

  it("renders the Sheet in the correct position based on the 'side' variant", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  
    const trigger = screen.getByText("Open Sheet");
    fireEvent.click(trigger);
  
    const sheetContent = screen.getByRole("dialog");
    expect(sheetContent).toHaveClass("inset-y-0", "left-0");
  });
  

  it("forwards refs correctly to SheetTitle and SheetDescription", () => {
    const titleRef = React.createRef<HTMLHeadingElement>();
    const descriptionRef = React.createRef<HTMLParagraphElement>(); // Adjusted to match the actual element type
  
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle ref={titleRef}>Sheet Title</SheetTitle>
            <SheetDescription ref={descriptionRef}>
              Sheet Description
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  
    const trigger = screen.getByText("Open Sheet");
    fireEvent.click(trigger);
  
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement); // Adjusted expectation
  });
  
  
});
