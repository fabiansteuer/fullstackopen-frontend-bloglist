import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";
import Blog from "./Blog";

const blog = {
  id: "blogId123",
  title: "Fabian's Blog",
  author: "Fabian",
  url: "https://fabiansteuer.com",
  likes: 123,
  user: { id: "userId123", username: "fabian", name: "Fabian" },
};

test("render blog title but not author, url and likes", async () => {
  render(<Blog blog={blog} />);

  screen.getByText(blog.title);

  const author = screen.queryByText(blog.author);
  expect(author).toBeNull();

  const url = screen.queryByText(blog.url);
  expect(url).toBeNull();

  const likes = screen.queryByText(blog.likes, { exact: false });
  expect(likes).toBeNull();
});

test("render blog title, author, url and likes after clicking show button", async () => {
  const user = userEvent.setup();

  const { container } = render(<Blog blog={blog} />);

  const button = container.querySelector("#show-blog");
  await user.click(button);

  screen.getByText(blog.title);
  screen.getByText(blog.author);
  screen.getByText(blog.url);
  screen.getByText(blog.likes, { exact: false });
});

test("clicking the like button twice calls the corresponding event handler twice", async () => {
  const user = userEvent.setup();

  const spyUpdateBlog = jest
    .spyOn(blogService, "update")
    .mockImplementation(() => {
      return { ...blog, likes: blog.likes + 1 };
    });

  const blogs = [blog];
  const setBlogs = jest.fn();
  const showMessage = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      showMessage={showMessage}
    />
  );

  const showButton = container.querySelector("#show-blog");
  await user.click(showButton);

  const likeButton = container.querySelector("#like-blog");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(spyUpdateBlog).toBeCalledTimes(2);
});
