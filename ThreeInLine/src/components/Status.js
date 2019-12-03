import React from "react";

function Status({ rounds, winner, next }) {
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if (rounds === 9) {
    status = "Tie";
  } else {
    status = "Next player: " + next;
  }

  return <p className="status">{status}</p>;
}

export { Status };
