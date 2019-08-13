import React from "react";
import { Link } from "react-router-dom";

export default function GameDisplay(props) {
  return (
    <div>
      <h1>Game:</h1>
      {props.room.users.length === 2 ? (
        <div>
          <h2>Choose your answer:</h2>
          <button value="1" onClick={props.onClick}>1</button>
          <button value="2" onClick={props.onClick}>2</button>
          <button value="3" onClick={props.onClick}>3</button>
        </div>
      ) : (
        <p>Waiting for the other player</p>
      )}
      <Link to="/">Quit the game</Link>
    </div>
  );
}
