import React from "react";
import "./Game.css";

function Victory () {
  return <div>
    <h2>Congratulations! You are a wonderful team!</h2>
  </div>
}

function Failure () {
  return <div>
    <h2>You loose... Try one more time</h2>
  </div>
}

function Waiting ({ on }) {
  return <h3>Waiting for the {on}.</h3>
}

function Button ({ onClick, value, content }) {
  return <button
    className="answer-button"
    value={value}
    onClick={onClick}
  >
    {content}
  </button>
}

function History ({ round, other, previous }) {
  return round > 1
    ? <h2>
      The other player answered {other.value} and you answered{" "}
      {previous.value} in the previous round
    </h2>
    : <h2>Give your answer! Will your partner match?</h2>
}

function Choices ({ onClick, room, values, styles, other, previous }) {
  console.log('values test:', values)

  return <div>
    <h3>
      Try to choose the same answer as your game partner, then you will
      get level up, if not - you will loose your points
    </h3>

    <h2>Choose your answer:</h2>

    <div className="answers-container">
      <Button value="1" content={values[0]} onClick={onClick} />
      <Button value="2" content={values[1]} onClick={onClick} />
      <Button value="3" content={values[2]} onClick={onClick} />
      <Button value="4" content={values[3]} onClick={onClick} />
      <Button value="5" content={values[4]} onClick={onClick} />
    </div>

    <h2>Your level is {room.stage}</h2>

    <h2>It's round #{room.round}</h2>

    <div className="container">
      <div className="progress-bar" style={styles} />
    </div>

    <History round={room.round} other={other} previous={previous} />
  </div>
}

function Content ({ room, user, onClick, values, styles, other, previous }) {
  if (room.users.length === 2) {
    if (room.stage === 10) {
      return <Victory />
    } 
    
    if (room.stage === 0) {
      return <Failure />
    }

    const choice = room.choices &&
      room.choices.find(choice => choice.round === room.round && choice.userId === user.id)

    if (choice) {
      return <Waiting on="other player's choice" />
    }
    
    return <Choices
      onClick={onClick}
      room={room}
      values={values}
      styles={styles}
      other={other}
      previous={previous}
    />
  }
    
  return <Waiting on="other player to join" />
}

export default function GameDisplay(props) {
  const previousAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId === props.user.id
  );

  const otherAnswer = props.room.choices.find(
    choice =>
      choice.round === props.room.round - 1 && choice.userId !== props.user.id
  );

  let height = 350 - parseInt(props.room.stage) * 35;

  let styles = {
    width: "150px",
    height: height + "px",
    backgroundColor: "white"
  };

  return (
    <div className="hole-game">
      <h1>Game:</h1>
      
      <Content
        room={props.room}
        user={props.user}
        onClick={props.onClick}
        values={props.values}
        styles={styles}
        other={otherAnswer}
        previous={previousAnswer}
      />

      <button onClick={props.quitGame}>Quit the game</button>
    </div>
  );
}
