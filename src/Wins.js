import React from "react";

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
      <div>
        <div>
          X won <span style={{ color: "red" }}>{countedWins.X || 0} </span>{" "}
          times
        </div>
        <div>
          O won <span style={{ color: "red" }}>{countedWins.O || 0}</span> times
        </div>
      </div>
    </>
  );
};

export default Wins;
