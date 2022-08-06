import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, showMessage }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = () => setShowDetails(!showDetails);

  const likeBlog = async (event) => {
    event.preventDefault();

    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };

      const updatedBlog = await blogService.update(likedBlog);

      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error(error);
      showMessage({ text: "Failed to like the blog.", type: "error" });
    }
  };

  const removeBlog = async (event) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        blogService.remove(blog);
        setBlogs(blogs.filter((b) => b.id != blog.id));
        showMessage({ text: "Blog removed.", type: "success" });
      } catch (error) {
        console.error(error);
        showMessage({ text: "Failed to remove blog.", type: "error" });
      }
    }
  };

  const blogStyle = {
    paddingLeft: 8,
    paddingBottom: 16,
    border: "solid",
    borderWidth: 1,
    marginBottom: 8,
  };

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        <h3>{blog.title}</h3>
        <button onClick={toggleShowDetails}>Show</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={likeBlog}>Like</button>
      </p>
      <button onClick={toggleShowDetails}>Hide</button>
      <button onClick={removeBlog}>Remove</button>
    </div>
  );
};

export default Blog;
