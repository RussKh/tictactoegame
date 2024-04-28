import React, { useEffect, useState } from "react";
import Board from "./Board";

function App() {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningColors, setWinningColors] = useState(new Array(9).fill(null));
  const [wins, setWins] = useState([]);

  useEffect(() => {
    if (!isXNext && !winner) {
      computerMove();
    }
  }, [isXNext, winner]);

  function handleMove(index) {
    if (!squares[index] && !winner) {
      const newSquares = [...squares];
      newSquares[index] = isXNext ? "X" : "O";
      setSquares(newSquares);
      checkWinner(newSquares);
      setIsXNext(!isXNext);
    }
  }

  function computerMove() {
    let i = Math.floor(Math.random() * 10) % 9;
    if (!squares[i]) handleMove(i);
    else computerMove();
  }

  function checkWinner(newSquares) {
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
      const [a, b, c] = lines[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        setWinner(newSquares[a]);
        setWinningColors([...Array(9).fill(false)]);
        setWinningColors((prevColors) =>
          prevColors.map((_, index) =>
            lines[i].includes(index) ? true : false
          )
        );
        setWins([...wins, newSquares[a]]);
        return;
      }
    }
  }

  function reset() {
    setSquares(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningColors(new Array(9).fill(null));
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <Board
        handleMove={handleMove}
        squares={squares}
        winner={winner}
        winningColors={winningColors}
      />

      {winner && <h2>{winner} won!</h2>}

      {winner && (
        <button className="button" onClick={reset}>
          Play again?
        </button>
      )}

      <div>Computer is playing: {!isXNext && !winner && <span>Yes</span>}</div>
    </div>
  );
}

export default App;
