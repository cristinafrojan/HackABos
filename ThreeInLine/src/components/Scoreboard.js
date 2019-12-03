import React, { useEffect, useState } from "react";
import { getLatestGames } from "../http/tickTackToeService";

function Scoreboard({ onShowScoreBoardChange }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then(response => setGames(response.data));
  }, []);

  return (
    <div className="scoreboard">
      <button onClick={() => onShowScoreBoardChange(false)}>
        Close Scoreboard
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Winner</th>
            <th>With</th>
          </tr>
        </thead>
        <tbody>
          {games.map(({ id, player1, player2, winner, type }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{player1}</td>
              <td>{player2}</td>
              <td>{winner}</td>
              <td>{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Scoreboard };
