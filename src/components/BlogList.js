import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  console.log(blogs);
  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

export default BlogList;
