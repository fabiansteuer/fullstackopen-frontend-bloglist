import { useState, useEffect } from "react";
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

  useEffect(() => {
    blogService.list().then((blogs) => setBlogs(blogs));
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

  const handleLogout = async (event) => {
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
          setBlogs={setBlogs}
          showMessage={showMessage}
        />
      ) : (
        <>
          <div>
            {user.name} is logged in{" "}
            <span>
              <button onClick={handleLogout}>Log out</button>
            </span>
          </div>
          <Togglable buttonLabel="Add blog">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              showMessage={showMessage}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
