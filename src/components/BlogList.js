import Blog from "./Blog";

const BlogList = ({ blogs, setBlogs, showMessage }) => {
  return (
    <div>
      <h2>List</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          showMessage={showMessage}
        />
      ))}
    </div>
  );
};

export default BlogList;
