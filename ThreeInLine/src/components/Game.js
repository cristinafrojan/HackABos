import React, { useState } from "react";
import { Players } from "./Players";
import { Board } from "./Board";
import { Scoreboard } from "./Scoreboard";

function Game() {
  const [players, setPlayers] = useState([]);
  const [showScoreboard, setShowScoreboard] = useState(false);

  return (
    <div className="game">
      {players.length < 2 && (
        <Players
          onPlayersChanged={player => setPlayers(players.concat(player))}
        />
      )}
      {players.length === 2 && (
        <Board
          player1={players[0]}
          player2={players[1]}
          onShowScoreBoardChange={setShowScoreboard}
          onPlayersChanged={() => setPlayers([])}
        />
      )}
      {showScoreboard && (
        <Scoreboard onShowScoreBoardChange={setShowScoreboard} />
      )}
    </div>
  );
}

export { Game };
