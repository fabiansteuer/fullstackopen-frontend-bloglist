import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";

const blog = {
  id: "blogId123",
  title: "Fabian's Blog",
  author: "Fabian",
  url: "https://fabiansteuer.com",
  likes: 123,
  user: { id: "userId123", username: "fabian", name: "Fabian" },
};

test("adding a blog calls the corresponding event handler with the blog's details", async () => {
  const user = userEvent.setup();

  const spyCreateBlog = jest
    .spyOn(blogService, "create")
    .mockImplementation(() => {
      return Promise.resolve(blog);
    });

  const blogs = [];
  const setBlogs = jest.fn();
  const showMessage = jest.fn();
  const blogFormTogglableRef = { current: { toggleVisibility: jest.fn() } };

  const { container } = render(
    <BlogForm
      blogs={blogs}
      setBlogs={setBlogs}
      showMessage={showMessage}
      blogFormTogglableRef={blogFormTogglableRef}
    />
  );

  const titleInput = container.querySelector("#title");
  await user.type(titleInput, blog.title);

  const authorInput = container.querySelector("#author");
  await user.type(authorInput, blog.author);

  const urlInput = container.querySelector("#url");
  await user.type(urlInput, blog.url);

  const button = container.querySelector("#add-blog");
  await user.click(button);

  expect(spyCreateBlog).toBeCalled();
  expect(spyCreateBlog.mock.calls[0]).toContainEqual({
    title: blog.title,
    author: blog.author,
    url: blog.url,
  });
});
