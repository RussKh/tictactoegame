import React from "react";
import Square from "./Square";
import "./App.css";

const boardStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  border: "1px solid black",
  borderRadius: "5px",
  width: "300px",
  height: "300px",
};

const Board = ({ squares, handleMove, winner, winningColors }) => {
  return (
    <div className={winner && "blockedBoard"} style={boardStyle}>
      {squares.map((square, ix) => (
        <Square
          key={ix}
          index={ix}
          square={square}
          handleMove={handleMove}
          winningColors={winningColors[ix]}
        />
      ))}
    </div>
  );
};

export default Board;
