import axios from "axios";

const BASE_URL =
  "https://5dda901c5730550014fe78e2.mockapi.io/api/v1/tick-tack-toe";

export function getLatestGames() {
  return axios.get(`${BASE_URL}?limit=10&page=1`);
}

export function addGame({ player1, player2, winner, type }) {
  return axios.post(`${BASE_URL}`, { player1, player2, winner, type });
}
