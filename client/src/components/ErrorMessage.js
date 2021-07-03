import React from "react";
import "./ErrorMessage.css";

function ErrorMessage(props) {
  return <div className="error_message_box">{props.children}</div>;
}

export default ErrorMessage;
