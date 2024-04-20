import React from "react";

const style = {
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px",
};
const Square = (props) => {
  return (
    <button style={style} onClick={() => props.onClick(props.index)}>
      {/* {props.index} */}
      {props.square}
    </button>
  );
};

export default Square;
