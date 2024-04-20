import "./App.css";
import { useState } from "react";
import Board from "./Board";

function App() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  const handleClick = (index, square) => {
    if (!square) {
      setSquares(squares.map((square, ix) => (ix === index ? turn : square)));
    }
    setTurn(turn === "X" ? "O" : "X");
  };

  // const handleClick = (index) => {
  //   setSquares(squares.map((square, ix) => (ix === index ? "X" : square)));
  // };

  return (
    <div className="App">
      <Board squares={squares} onClick={handleClick} />
    </div>
  );
}

export default App;
