const style = {
  marginTop: "8px",
  padding: "8px",
  color: "white",
  borderRadius: 2,
};

const Message = ({ message, type }) => {
  if (!message) return null;

  let backgroundColor = "gray";

  if (type === "success") {
    backgroundColor = "green";
  } else if (type === "error") {
    backgroundColor = "red";
  }

  return <div style={{ ...style, backgroundColor }}>{message}</div>;
};

export default Message;
