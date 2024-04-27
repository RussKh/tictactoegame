import "./App.css";
import { useEffect, useState } from "react";
import Board from "./Board";
import Wins from "./Wins";

function App() {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningColors, setWinningColors] = useState(new Array(9).fill(null));
  const [wins, setWins] = useState([]);

  function handleMove(index) {
    if (!squares[index]) {
      const newSquares = [...squares];
      newSquares[index] = isXNext ? "X" : "O";
      checkWinner(newSquares);
      setIsXNext(!isXNext);
      setSquares(newSquares);
    }
    // computerTurn();
    // console.log(squares);
  }

  function computerTurn() {
    // generate number 1-8 and set as index
    // if square not null put turn in it
    // else get another number

    const x = Math.floor(Math.random() * 10) % 9;

    if (!squares[x]) {
      setSquares(
        squares.map((square, i) => (i === x ? (square = isXNext) : square))
      );
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

        setWinningColors(
          winningColors.map((_, ix) =>
            ix === lines[i].find((x) => x === ix) ? true : false
          )
        );
        setWins([...wins, squares[lines[i][0]]]);
      }
    }
  }

  function reset() {
    setSquares(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningColors(new Array(9).fill(null));
  }

  useEffect(() => {
    checkWinner();
  }, [squares]);

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

      <Wins wins={wins} />
    </div>
  );
}

export default App;
