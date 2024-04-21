import "./App.css";
import { useState } from "react";
import Board from "./Board";

function App() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  // const [turn, setTurn] = useState("X");
  const [isXNext, setIsXNext] = useState(true);

  // const handleClick = (index, square) => {
  //   if (!square) {
  //     setSquares(squares.map((square, ix) => (ix === index ? turn : square)));
  //     setTurn(turn === "X" ? "O" : "X");
  //   }
  // };

  // useState(null) winner
  function handleMove(index) {
    if (!squares[index]) {
      const newSquare = [...squares];
      newSquare[index] = isXNext ? "X" : "O";
      setSquares(newSquare);
      setIsXNext(!isXNext);
    }
  }

  const handleClick = (index) => {
    setSquares(squares.map((square, ix) => (ix === index ? "X" : square)));
  };

  return (
    <div className="App">
      <Board
        squares={squares}
        handleMove={handleMove}
        // onClick={handleClick}
      />
    </div>
  );
}

export default App;
