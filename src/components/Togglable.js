import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
