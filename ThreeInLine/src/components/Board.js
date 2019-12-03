import React, { useState, useEffect } from "react";
import { Status } from "./Status";
import { Square } from "./Square";
import { calculateWinner } from "../shared/utils";
import { addGame } from "../http/tickTackToeService";

function Board({ player1, player2, onShowScoreBoardChange, onPlayersChanged }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayer1Playing, setIsPlayer1Playing] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w === "X") {
      setWinner(player1);
    }
    if (w === "O") {
      setWinner(player2);
    }
    if (w) {
      addGame({ player1, player2, winner, type: w }).then(() =>
        onShowScoreBoardChange(true)
      );
    }
  }, [squares]);

  const handleClick = i => {
    const squaresCopy = [...squares];

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    squaresCopy[i] = isPlayer1Playing ? "X" : "O";

    setSquares(squaresCopy);
    setIsPlayer1Playing(!isPlayer1Playing);
  };

  return (
    <React.Fragment>
      <Status
        rounds={squares.filter(s => s !== null)}
        winner={winner}
        next={isPlayer1Playing ? `${player1} (X)` : `${player2} (O)`}
      />
      <div className="grid">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onChangeSquare={() => handleClick(i)}
          />
        ))}
      </div>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => {
            setSquares(Array(9).fill(null));
            setIsPlayer1Playing(true);
            setWinner(null);
            onShowScoreBoardChange(false);
          }}
        >
          Reset
        </button>
        <button
          className="btn"
          onClick={() => {
            onPlayersChanged([]);
          }}
        >
          Enter Players
        </button>
      </div>
    </React.Fragment>
  );
}

export { Board };
