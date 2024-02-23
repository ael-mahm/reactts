import React from "react";
import "./GameHistoryItem.css";
import { Link } from "react-router-dom";

interface Player {
  username: string;
  score: number;
}

interface GameLog {
  player1: Player;
  player2: Player;
  timestamp: number;
}

interface Props {
  gameLog: GameLog;
}

const GameHistoryItem: React.FC<Props> = ({ gameLog }) => {
  const { player1, player2, timestamp } = gameLog;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed, so we add 1
  const day = date.getDate();

  return (
    <tr>
      <td className={`${player1.score >= player2.score ? "winner" : ""}`}>
        <Link to={""} >{player1.username}</Link>
      </td>
      <td>{player1.score}</td>
      <td>{player2.score}</td>
      <td className={`${player2.score >= player1.score ? "winner" : ""}`}>
        <a href="http://example.com/58">{player2.username}</a>
      </td>
      <td>{`${year}-${month}-${day}`}</td>
    </tr>
  );
};

export default GameHistoryItem;
