import React from "react";
import { Link } from "react-router-dom";

export default function GameDisplay(props) {
  const previousAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId === props.user.id
  );

  const otherAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId !== props.user.id
  );

  return (
    <div>
      <h1>Game:</h1>
      {props.room.users.length === 2 ? (
        props.room.stage === 10 ? (
          <h2>Congratulations! You are a wonderful team!</h2>
        ) : props.room.stage === 0 ? (
          <h2>You loose... Try one more time</h2>
        ) : (
          <div>
            <h2>Choose your answer:</h2>
            <button value="1" onClick={props.onClick}>
              1
            </button>
            <button value="2" onClick={props.onClick}>
              2
            </button>
            <button value="3" onClick={props.onClick}>
              3
            </button>
            <h2>Your level is {props.room.stage}</h2>
            <h2>It's round #{props.room.round}</h2>
            {props.room.round > 1 ? (
              <h2>
                The other player answered {otherAnswer.value} and you answered{" "}
                {previousAnswer.value} in the previous round
              </h2>
            ) : (
              <p>Waiting for the answers...</p>
            )}
          </div>
        )
      ) : (
        <p>Waiting for the other player</p>
      )}
      <Link to="/">Quit the game</Link>
    </div>
  );
}
