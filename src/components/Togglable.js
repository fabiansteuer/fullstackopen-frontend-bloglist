import { useState } from "react";

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return <button onClick={toggleVisibility}>{props.buttonLabel}</button>;
  }

  return (
    <div>
      <div>{props.children}</div>
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  );
};

export default Togglable;
