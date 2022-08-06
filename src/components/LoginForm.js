import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { PropTypes } from "prop-types";

const LoginForm = ({ setUser, setBlogs, showMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      showMessage({
        text: "Login successful.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showMessage({
        text: "Wrong credentials.",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};

export default LoginForm;
