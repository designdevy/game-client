import React from "react";
import "./Game.css";

export default function GameDisplay(props) {
  const previousAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId === props.user.id
  );

  const otherAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId !== props.user.id
  );
  
  let height = 350 - (parseInt(props.room.stage) * 35)

  let styles = {
    width: "150px",
    height: height + "px",
    backgroundColor: "white"
  };

  let styles2 = {
    width: "150px",
    height: "350px",
    backgroundImage: "linear-gradient(to bottom, #27ae60,#f1c40f,#c0392b)"
  }

  return (
    <div className="hole-game">
      <h1>Game:</h1>
      {props.room.users.length === 2 ? (
        props.room.stage === 10 ? (
          <div>
            <h2>Congratulations! You are a wonderful team!</h2>
          </div>
        ) : props.room.stage === 0 ? (
          <div>
            <h2>You loose... Try one more time</h2>
          </div>
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
            <div className="container" style={styles2}>
              <div className="progress-bar" style={styles} />
            </div>
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
      <button onClick={props.quitGame}>Quit the game</button>
    </div>
  );
}
