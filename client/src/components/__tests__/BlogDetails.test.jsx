import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BlogDetails from "../BlogDetails";
import { AuthProvider } from "../../contexts/AuthContext"; // Import your AuthProvider

// Mock CustomerServices
jest.mock("../../services/CustomerServices", () => ({
  getStoredEmail: jest.fn(() => "test@example.com"),
  getStoredToken: jest.fn(() => "mocked-token"),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        title: "Sample Blog Title",
        content: "<p>Blog Content</p>",
        createdAt: new Date().toISOString(),
        userName: "testUser",
        tags: JSON.stringify(["tag1", "tag2"]),
        image: null,
      }),
  })
);

describe("BlogDetails Component", () => {
  it("renders blog details correctly", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BlogDetails />
        </MemoryRouter>
      </AuthProvider>
    );

    const titleElement = await screen.findByText("Sample Blog Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders fallback image when no blog image is provided", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BlogDetails />
        </MemoryRouter>
      </AuthProvider>
    );

    const imageElement = await screen.findByAltText("Sample Blog Title");
    expect(imageElement).toBeInTheDocument();
  });
});
