import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TopBlogs from "../TopBlogs";

describe("TopBlogs Component", () => {
  it("renders the top blogs heading", () => {
    render(
      <Router>
        <TopBlogs />
      </Router>
    );

    expect(screen.getByText("Top Stories")).toBeInTheDocument();
  });

  it("renders all the blog items", () => {
    render(
      <Router>
        <TopBlogs />
      </Router>
    );

    const blogItems = screen.getAllByRole("img");
    expect(blogItems).toHaveLength(5); // Ensure all 5 blogs are rendered
  });

  it("renders the correct blog titles", () => {
    render(
      <Router>
        <TopBlogs />
      </Router>
    );

    const blogTitles = [
      "A Dream Trip to Switzerland: Friends, ...",
      "A Journey Through the Mountains of Nepal",
      "New York City: The City That ...",
      "Exploring Indonesia: A Journey Through ...",
      "Discovering the Wonders of Italy",
    ];

    blogTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("opens the correct URL in a new tab on click", () => {
    // Mock window.open
    const openMock = jest.spyOn(window, "open").mockImplementation(() => {});

    render(
      <Router>
        <TopBlogs />
      </Router>
    );

    const blogLink = screen.getByText("A Dream Trip to Switzerland: Friends, ...");
    fireEvent.click(blogLink);

    expect(openMock).toHaveBeenCalledWith("./src/static/switzerland.html", "_blank");

    // Cleanup the mock
    openMock.mockRestore();
  });

  it("renders the fallback Link for blogs without URLs", () => {
    render(
      <Router>
        <TopBlogs />
      </Router>
    );

    const fallbackLink = screen.getByRole("link", {
      name: "A Dream Trip to Switzerland: Friends, ...",
    });

    expect(fallbackLink).toHaveAttribute("href", "#");
  });
});
