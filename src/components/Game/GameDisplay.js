import React from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import "./Game.css";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function Victory () {
  const { width, height } = useWindowSize()
  return <div>
    <Confetti
      width={width}
      height={height}
    />
    <h2 className="game-text">Congratulations! You are a wonderful team!</h2>
    <img alt="win" src="https://thumbs.gfycat.com/QuickSaltyCottontail.webp" />
  </div>
}

function Failure () {
  return <div>
    <h2 className="game-text">You lose... Try one more time</h2>
    <img alt="lose" src="https://media.tenor.com/images/64447af076fd4f692790601de9c710f3/tenor.gif" />
  </div>
}

function Waiting ({ on }) {
  return <h3 className="game-text">Waiting for the {on}.</h3>
}

function Left () {
  return <div>
    <h3 className="game-text">Your partner left the game</h3>
    <img className="left-img" alt="left" src="https://www.sccpre.cat/mypng/full/56-560673_forever-alone-meme-shaped-sticker-unixstickers-png-transparent.png" />
  </div>
}

function Btn ({ onClick, value, content }) {
  let buttonContent = content
  if (typeof content === "number") {
    buttonContent = <span className="number-choice">{content}</span>
  }
  return <button
    className="answer-button"
    value={value}
    onClick={onClick}
  >
    {buttonContent}
  </button>
}

function YourHistory ({ previous, values, room}) {
  let yourAnswer = values[parseInt(previous.value) - 1]
  if (room.type === 1) {
    yourAnswer = <span className="number-choice-selected">{values[parseInt(previous.value) - 1]}</span>
  }

  return <div>
    <h2 className="game-text">You answered:</h2>
    <div className="your-answer">{yourAnswer}</div>
  </div>
}

function PartnerHistory ({ other, otherName, values, room}) {
  let partnersAnswer = values[parseInt(other.value) - 1]
  if (room.type === 1) {
    partnersAnswer = <span className="number-choice-selected">{values[parseInt(other.value) - 1]}</span>
  }
  
  return <div>
    <h2 className="game-text">{otherName} answered:</h2>
    <div className="others-answer">{partnersAnswer}</div>
  </div>
}

function Choices ({ onClick, room, values, styles, other, previous, otherName }) {
  const gridBarContainerSize = room.round > 1 ? 4 : 12
  return <div>
    <h3 className="game-text">
      Try to choose the same answer as your game partner,<br/>then you will
      get level up, <br/>if not - you will loose your points
    </h3>

    <h2 className="game-text">Choose your answer:</h2>

    <div className="answers-container">
      <Btn value="1" content={values[0]} onClick={onClick} />
      <Btn value="2" content={values[1]} onClick={onClick} />
      <Btn value="3" content={values[2]} onClick={onClick} />
      <Btn value="4" content={values[3]} onClick={onClick} />
      <Btn value="5" content={values[4]} onClick={onClick} />
    </div>

    {room.round === 1
    ? <h2 className="game-text">Give your answer! Will your partner match?</h2>
    : null}

    <Grid container spacing={3}>
      {room.round > 1
      ? <Grid item xs={4} sm={4}>
          <YourHistory previous={previous} values={values} room={room} />
        </Grid>
      : null}

      <Grid item xs={gridBarContainerSize} sm={gridBarContainerSize}>
        <h2 className="game-text">Your level is {room.stage}</h2>
        <div className="bar-container">
          <div className="progress-bar" style={styles} />
        </div>
      </Grid>
    
      {room.round > 1
      ? <Grid item xs={4} sm={4}>
          <PartnerHistory other={other} otherName={otherName} values={values} room={room}/>
        </Grid>
      : null}
    </Grid>
    
    <h2 className="game-text">It's round #{room.round}</h2>
  </div>
}

function Content ({ room, user, onClick, values, styles, other, previous, otherName }) {
 
  if (room.stage === 10) {
    return <Victory />
  } 
  
  if (room.stage === 0) {
    return <Failure />
  }
  
  if (room.users.length === 2) {

    const choice = room.choices &&
      room.choices.find(choice => choice.round === room.round && choice.userId === user.id)

    if (choice) {
      return <div>
                <Waiting on="other player's choice" />
                <img alt="thinking-meme" src="https://tchol.org/images250_/thinking-meme-png-12.png" />
              </div>
    }
    
    return <Choices
      onClick={onClick}
      room={room}
      values={values}
      styles={styles}
      other={other}
      previous={previous}
      otherName={otherName}
    />
  }

  if (room.users.length === 1 && room.stage !== 5 && room.stage !== 10 && room.stage !== 0) {
    return <Left />
  }
    
  return <div>
    <h2 className="game-text">Hello {user.name}!</h2>
    <Waiting on="other player to join" />
    <img alt="thinking-meme" src="https://tchol.org/images250_/thinking-meme-png-12.png" />
  </div>
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

  const otherUser = props.room.users.find(
    user =>
      user.id !== props.user.id
  ) ? props.room.users.find(
    user =>
      user.id !== props.user.id
  ).name : "Anonymos";

  let height = 350 - parseInt(props.room.stage) * 35;

  let styles = {
    width: "150px",
    height: height + "px",
    backgroundColor: "white"
  };

  return (
    <div className="whole-game">
      <h1 className="game-text">Game:</h1>
      
      <Content
        room={props.room}
        user={props.user}
        onClick={props.onClick}
        values={props.values}
        styles={styles}
        other={otherAnswer}
        previous={previousAnswer}
        otherName={otherUser}
      />
      <br/>
      <Button className="quiter-btn" variant="contained" color="primary" onClick={props.quitGame}>Quit the game</Button>
    </div>
  );
}
