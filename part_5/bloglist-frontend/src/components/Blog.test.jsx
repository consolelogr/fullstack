import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Blog from "./Blog";
import BlogForm from "./blogForm";

describe("<Blog />", () => {
  test("renders title and author but not url or likes by default", () => {
    const blog = {
      title: "Testing React components",
      author: "Tester McTest",
      url: "http://example.com",
      likes: 10,
      user: { username: "tester", name: "Test User" },
    };

    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={{ username: "tester" }}
      />,
    );

    expect(
      screen.getByText("Testing React components — Tester McTest"),
    ).toBeInTheDocument();

    expect(screen.queryByText("http://example.com")).toBeNull();
    expect(screen.queryByText("likes 10")).toBeNull();
  });

  test("shows url and likes when view button is clicked", () => {
    const blog = {
      title: "Testing React components",
      author: "Tester McTest",
      url: "http://example.com",
      likes: 10,
      user: { username: "tester", name: "Test User" },
    };

    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={{ username: "tester" }}
      />,
    );

    fireEvent.click(screen.getByText("view"));

    expect(screen.getByText("http://example.com")).toBeInTheDocument();
    expect(screen.getByText("likes 10")).toBeInTheDocument();
  });

  test("calls updateBlog twice when like button is clicked twice", () => {
    const blog = {
      title: "Testing Likes",
      author: "Tester",
      url: "http://example.com",
      likes: 5,
      user: { username: "tester", name: "Test User" },
    };

    const mockHandler = vi.fn();

    render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        removeBlog={() => {}}
        user={{ username: "tester" }}
      />,
    );

    fireEvent.click(screen.getByText("view"));
    const likeButton = screen.getByText("like");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});

describe("<BlogForm />", () => {
  test("creates a new blog with correct details", () => {
    const createBlog = vi.fn();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("write title here");
    const authorInput = screen.getByPlaceholderText("write author here");
    const urlInput = screen.getByPlaceholderText("write url here");

    fireEvent.change(titleInput, { target: { value: "New Blog Title" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });
    fireEvent.change(urlInput, { target: { value: "http://blog.com" } });

    const createButton = screen.getByText("create");
    fireEvent.click(createButton);

    expect(createBlog).toHaveBeenCalledTimes(1);

    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "New Blog Title",
      author: "New Author",
      url: "http://blog.com",
    });
  });
});
