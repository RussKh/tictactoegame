import React from "react";
import Square from "./Square";

const boardStyle = {
  border: "1px solid black",
  borderRadius: "5px",
  width: "300px",
  height: "300px",
  margin: "20px auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
};

const Board = ({ squares, onClick }) => {
  return (
    <div style={boardStyle}>
      {squares.map((square, ix) => (
        <Square key={ix} index={ix} square={square} onClick={onClick} />
      ))}
    </div>
  );
};

export default Board;
