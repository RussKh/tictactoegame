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

const difficultyLevel = ["easy", "hard", "impossible"];

function App() {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningColors, setWinningColors] = useState(
    new Array(9).fill("button button-trans")
  );
  const [wins, setWins] = useState([]);
  const [isComputerPlaying, setIsComputerPlaying] = useState(true);
  const [difficulty, setDifficulty] = useState(difficultyLevel[0]);

  let turnCount = squares.filter((square) => square).length;

  function handleDifficulty() {
    let i = difficultyLevel.findIndex((level) => level === difficulty);
    setDifficulty(difficultyLevel[(i + 1) % 3]);
    setSquares(new Array(9).fill(null));
    setWinningColors(new Array(9).fill("button button-trans"));
    setSquares(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  function handleComputerPlaying() {
    setIsComputerPlaying(!isComputerPlaying);
    reset();
  }

  function reset() {
    setSquares(new Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningColors(new Array(9).fill("button button-trans"));
  }

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
    // If O is close to winning, finish it
    let probability =
      difficulty === "easy" ? 0.5 : difficulty === "hard" ? 0.8 : 1;

    console.log(probability);

    if (Math.random() <= probability)
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
    if (Math.random() <= probability)
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
    // if 2 X's are close to one corner block that corner
    if (Math.random() <= probability) {
      let edgeCornerPairs = [
        [0, 1, 3],
        [2, 1, 5],
        [6, 3, 7],
        [8, 5, 7],
      ];
      for (let edgeCornerPair of edgeCornerPairs) {
        if (
          edgeCornerPair.filter((el) => squares[el] === "X").length === 2 &&
          edgeCornerPair.find((el) => !squares[el])
        ) {
          handleMove(edgeCornerPair.find((el) => !squares[el]));
          return;
        }
      }
    }
    // if 2 X's are in opposite corners put O on any edge
    if (Math.random() <= probability) {
      if (
        (squares[0] === squares[8] && squares[0] === "X") ||
        (squares[2] === squares[6] && squares[2] === "X")
      ) {
        for (let edge of [1, 3, 5, 7]) {
          if (!squares[edge]) {
            // Check if the position is vacant before making a move
            handleMove(edge);
            return; // Exit the function after making a move
          }
        }
      }
    }
    // if center is vacant, use it as the first move
    if (Math.random() <= probability) {
      if (!squares[4]) {
        handleMove(4);
        return; // Exit the function after making a move
      } else {
        // if X in center put X in any corner
        for (let corner of [0, 2, 6, 8]) {
          if (!squares[corner]) {
            // Check if the position is vacant before making a move
            handleMove(corner);
            return; // Exit the function after making a move
          }
        }
      }
    }

    // all else put O in any available square randomly
    let vacantBoxes = squares.map((e, i) => (!e ? i : "")).filter(String);
    let randomIndex =
      vacantBoxes[Math.floor(Math.random() * vacantBoxes.length)];
    handleMove(randomIndex);
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

  useEffect(() => {
    if (turnCount === 9 && !winner)
      setWinningColors([...Array(9).fill("button button-red")]);
  }, [turnCount]);

  return (
    <div className="App">
      <div className="App App-header">
        <div>Tic Tac Toe</div>
        <button className="emoji-button" onClick={handleComputerPlaying}>
          {isComputerPlaying ? "🤖" : "👨‍🦰"}
        </button>
      </div>

      <button
        className={isComputerPlaying ? "level" : "level level-inactive"}
        onClick={handleDifficulty}
      >
        Level: {difficulty}
      </button>

      <Board
        handleMove={handleMove}
        squares={squares}
        winner={winner}
        winningColors={winningColors}
      />

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
