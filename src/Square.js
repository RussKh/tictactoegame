import React from "react";

const style = {
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
  height: "100px",
  fontSize: "80px",
};
const Square = (props) => {
  return (
    <button
      style={style}
      // onClick={() => props.handleMove(props.index)}
      onClick={() => props.onClick(props.index, props.square)}
    >
      {/* {props.index} */}
      {props.square}
    </button>
  );
};

export default Square;
