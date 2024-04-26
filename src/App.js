import "./App.css";
import { useState } from "react";
import Board from "./Board";

const winnigCombinations = [
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
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  // const [isWinner, setIsWinner] = useState();
  // const [isXNext, setIsXNext] = useState(true);
  // let winner =
  // if (winner.some((x) => x === true)) {
  // }

  function checkWinner() {
    let checkX = turn === "X" ? "O" : "X";
    let w = winnigCombinations
      .map((combo) => combo.map((s) => squares[s]).join(""))
      .find((win) => win === checkX.repeat(3));
    return w || "";
  }

  // const checkWinner = () => {
  //   if (
  //     winnigCombinations.some(
  //       (combo) => combo.map((s) => squares[s]).join("") === ("XXX" || "OOO")
  //     )
  //   )
  //     winner = turn === "X" ? "O" : "X";
  // };
  // console.log(winner);
  let winner = checkWinner();

  const handleClick = (index) => {
    if (!winner) {
      if (!squares[index]) {
        setSquares(squares.map((square, ix) => (ix === index ? turn : square)));
        setTurn(turn === "X" ? "O" : "X");
      }
    }
  };

  // console.log(checkWinner());
  // checkWinner();
  // useState(null) winner
  // function handleMove(index) {
  //   if (!squares[index]) {
  //     const newSquare = [...squares];
  //     newSquare[index] = isXNext ? "X" : "O";
  //     setSquares(newSquare);
  //     setIsXNext(!isXNext);
  //   }
  // }

  // const handleClick = (index) => {
  //   setSquares(squares.map((square, ix) => (ix === index ? "X" : square)));
  // };

  return (
    <>
      <div className="App">
        <Board
          squares={squares}
          // handleMove={handleMove}
          onClick={handleClick}
        />
        <h1>Winner is: {winner[0]}</h1>
        <div>
          {winner && (
            <button
              onClick={() => {
                setSquares(new Array(9).fill(null));
                setTurn("X");
              }}
            >
              Play Again?
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
