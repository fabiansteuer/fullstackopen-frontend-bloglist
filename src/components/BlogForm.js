import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setMessage, setMessageType }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = async (event) => {
    event.preventDefault();

    const newBlog = { title, author, url };

    blogService
      .create(newBlog)
      .then((createdBlog) => {
        setBlogs(blogs.concat(createdBlog));
        setTitle("");
        setAuthor("");
        setUrl("");
        setMessage(
          `Blog ${createdBlog.title} by ${createdBlog.author} succesfully added.`
        );
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        setMessage(errorMessage);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BlogForm;
