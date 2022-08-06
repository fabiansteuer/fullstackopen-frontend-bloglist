import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  if (!isVisible) {
    return <button onClick={toggleVisibility}>{props.buttonLabel}</button>;
  }

  return (
    <div>
      <div>{props.children}</div>
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  );
});

export default Togglable;
