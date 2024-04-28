import React from "react";
import "./App.css";

const style = {
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
  height: "100px",
  fontSize: "80px",
  color: "black",
};

const newStyle = {
  ...style,
  color: "black",
};

const Square = (props) => {
  return (
    <button
      // className={+props.winningColors && "button"}
      className={props.winningColors}
      style={newStyle}
      onClick={() => props.handleMove(props.index)}
    >
      {props.square}
    </button>
  );
};

export default Square;
