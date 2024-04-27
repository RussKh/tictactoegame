import React from "react";
import Square from "./Square";

const boardStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  border: "1px solid black",
  borderRadius: "5px",
  width: "300px",
  height: "300px",
  margin: "50px auto",
};

const Board = ({ squares, handleMove, winner }) => {
  return (
    <div className={winner && "blockedBoard"} style={boardStyle}>
      {squares.map((square, ix) => (
        <Square
          key={ix}
          index={ix}
          square={square}
          // onClick={onClick}
          handleMove={handleMove}
        />
      ))}
    </div>
  );
};

export default Board;
