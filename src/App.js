import "./App.css";
import { useEffect, useState } from "react";
import Board from "./Board";
// import "bootstrap/dist/css/bootstrap.css"

function App() {
  const [winner, setWinner] = useState(null);

  const [squares, setSquares] = useState(new Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);

  function handleMove(index) {
    if (!squares[index]) {
      const newSquares = [...squares];
      newSquares[index] = isXNext ? "X" : "O";
      checkWinner(newSquares);
      setIsXNext(!isXNext);
      setSquares(newSquares);
    }
  }

  function checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      if (
        squares[lines[i][0]] === squares[lines[i][1]] &&
        squares[lines[i][1]] === squares[lines[i][2]] &&
        squares[lines[i][0]]
      ) {
        setWinner(squares[lines[i][0]]);
      }
    }
  }

  function reset() {
    setSquares(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  useEffect(() => {
    checkWinner();
  }, [squares]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <Board handleMove={handleMove} squares={squares} winner={winner} />
      {winner && <h2>Congratulations, {winner}! </h2>}

      {winner && <button onClick={reset}>RESET</button>}
    </div>
  );
}

export default App;
