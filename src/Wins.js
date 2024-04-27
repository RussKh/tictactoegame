import React from "react";

// const testArray = ["X", "O", "X"];

const Wins = (props) => {
  const countedWins = props.wins.reduce((allTurns, turn) => {
    const currCount = Object.hasOwn(allTurns, turn) ? allTurns[turn] : 0;
    return {
      ...allTurns,
      [turn]: currCount + 1,
    };
  }, {});

  return (
    <>
      <h3>X won {countedWins.X || 0} times</h3>
      <h3>O won {countedWins.O || 0} times</h3>
    </>
  );
};

export default Wins;
