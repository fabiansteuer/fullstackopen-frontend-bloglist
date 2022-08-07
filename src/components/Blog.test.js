import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title but not author, url and likes", () => {
  const blog = {
    title: "Fabian's Blog",
    author: "Fabian",
    url: "https://fabiansteuer.com",
    likes: 123,
  };

  render(<Blog blog={blog} />);

  screen.getByText(blog.title);

  const author = screen.queryByText(blog.author);
  expect(author).toBeNull();

  const url = screen.queryByText(blog.url);
  expect(url).toBeNull();

  const likes = screen.queryByText(blog.likes, { exact: false });
  expect(likes).toBeNull();
});
