import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, showMessage, blogFormTogglableRef }) => {
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
        showMessage({
          text: `Blog ${createdBlog.title} by ${createdBlog.author} succesfully added.`,
          type: "success",
        });
        blogFormTogglableRef.current.toggleVisibility();
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.response.data.error;
        showMessage({
          text: errorMessage,
          type: "error",
        });
      });
  };

  return (
    <div>
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
        <button type="submit" id="add-blog">
          Add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
