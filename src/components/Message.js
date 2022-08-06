import { useState } from "react";

const style = {
  marginTop: "8px",
  padding: "8px",
  color: "white",
  borderRadius: 2,
};

const Message = ({ message }) => {
  if (!message.text) return null;

  let backgroundColor = "gray";

  if (message.type === "success") {
    backgroundColor = "green";
  } else if (message.type === "error") {
    backgroundColor = "red";
  }

  return <div style={{ ...style, backgroundColor }}>{message.text}</div>;
};

export default Message;
