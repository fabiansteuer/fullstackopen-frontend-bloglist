import { useState, useEffect } from "react";
import Togglable from "./components/Togglable";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      blogService.setToken(user.token);
      setBlogs(await blogService.list());

      setUsername("");
      setPassword("");

      setMessage("Login successful.");
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Wrong credentials");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.removeItem("user");
    setUser(null);

    blogService.setToken(null);
    setBlogs([]);

    setMessage("Logout successful.");
    setMessageType("success");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Message message={message} type={messageType} />
      {user === null ? (
        <>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </>
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
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
