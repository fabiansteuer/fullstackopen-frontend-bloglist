import { useState, useEffect, useRef } from "react";
import Togglable from "./components/Togglable";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [message, setMessage] = useState({ text: null, type: null });
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const setSortedBlogs = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      if (a.likes < b.likes) {
        return 1;
      } else if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    setBlogs(sortedBlogs);
  };

  useEffect(() => {
    blogService.list().then((blogs) => setSortedBlogs(blogs));
  }, []);

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("user");

    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const showMessage = ({ text, type }) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: null, type: null }), 5000);
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("user");
    setUser(null);

    blogService.setToken(null);
    setBlogs([]);

    showMessage({ text: "Logout successful.", type: "success" });
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Message message={message} />
      {user === null ? (
        <LoginForm
          setUser={setUser}
          setBlogs={setSortedBlogs}
          showMessage={showMessage}
        />
      ) : (
        <>
          <p>
            {user.name} is logged in{" "}
            <span>
              <button onClick={handleLogout}>Log out</button>
            </span>
          </p>
          <h2>Add Blog</h2>
          <Togglable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm
              blogs={blogs}
              setBlogs={setSortedBlogs}
              showMessage={showMessage}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            setBlogs={setSortedBlogs}
            showMessage={showMessage}
          />
        </>
      )}
    </div>
  );
};

export default App;
