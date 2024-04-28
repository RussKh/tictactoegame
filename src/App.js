import "./App.css";
import { useEffect, useState } from "react";
import Board from "./Board";
import Wins from "./Wins";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningColors, setWinningColors] = useState(
    new Array(9).fill("button button-trans")
  );
  const [wins, setWins] = useState([]);
  const [isComputerPlaying, setIsComputerPlaying] = useState(false);

  let turnCount = squares.filter((square) => square).length;

  useEffect(() => {
    if (!isXNext && !winner && isComputerPlaying && turnCount < 9) {
      setTimeout(() => {
        computerMove();
      }, 300);
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
    // if center is vacant, use it as the first move
    if (!squares[4]) {
      handleMove(4);
      return; // Exit the function after making a move
    }

    // If O is close to winning, finish it
    for (let combo of winningCombos) {
      if (combo.filter((el) => squares[el] === "O").length === 2) {
        let ix = combo.find((x) => squares[x] !== "O");
        if (!squares[ix]) {
          // Check if the position is vacant before making a move
          handleMove(ix);
          return; // Exit the function after making a move
        }
      }
    }

    // If X is close to winning, block it
    for (let combo of winningCombos) {
      if (combo.filter((el) => squares[el] === "X").length === 2) {
        let ix = combo.find((x) => squares[x] !== "X");
        if (!squares[ix]) {
          // Check if the position is vacant before making a move
          handleMove(ix);
          return; // Exit the function after making a move
        }
      }
    }

    // If no winning combinations are found, use any vacant corner
    for (let corner of [0, 2, 6, 8]) {
      if (!squares[corner]) {
        // Check if the position is vacant before making a move
        handleMove(corner);
        return; // Exit the function after making a move
      }
    }
  }

  function checkWinner(newSquares) {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        setWinner(newSquares[a]);
        // setWinningColors([...Array(9).fill(false)]);
        setWinningColors((prevColors) =>
          prevColors.map((_, index) =>
            winningCombos[i].includes(index) ? "button" : "button button-trans"
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

  useEffect(() => {
    if (turnCount === 9 && !winner)
      setWinningColors([...Array(9).fill("button button-red")]);
  }, [turnCount]);

  return (
    <div className="App">
      <div className="App App-header">
        <div>Tic Tac Toe</div>
        <button
          className="emoji-button"
          onClick={() => setIsComputerPlaying(!isComputerPlaying)}
        >
          {isComputerPlaying ? "🤖" : "👨‍🦰"}
        </button>
      </div>

      <Board
        handleMove={handleMove}
        squares={squares}
        winner={winner}
        winningColors={winningColors}
      />
      {/* {turnCount < 9 ? winner && <h2>{winner} won!</h2> : <h2>DRAW!</h2>} */}

      <div className="App App-footer">
        <Wins wins={wins} />
      </div>

      <button className="button" onClick={reset}>
        {winner ? "Play Again?" : "Reset"}
      </button>
    </div>
  );
}

export default App;
