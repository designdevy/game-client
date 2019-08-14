import React from "react";
import GameDisplay from "./GameDisplay";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "../serverUrl";
import { withRouter, Redirect } from "react-router-dom";

class GameContainer extends React.Component {
  state = {
    redirect: false
  }

  handleChoice = async event => {
    event.preventDefault();

    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );

    await superagent.post(`${serverUrl}/choice`).send({
      value: event.target.value,
      userId: this.props.user.id,
      roomId: room.id
    });
  };

  // remove the user to the current room, if user quit the game
  quitGame = async event => {
    event.preventDefault();
    this.setState({redirect: true})
    await superagent.put(`${serverUrl}/users/${this.props.user.id}`).send({
      roomId: this.props.match.params.id,
      userId: this.props.user.id
    });
  };

  renderRedirect = () => {
    if (this.state.redirect === true) {
      console.log('I was called!!!')
      return <Redirect to={'/'} />;
    } else {
      return <div/>;
    }
  };

  render() {
    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );
    return (
      <div>
        <GameDisplay
          user={this.props.user}
          room={room}
          onClick={this.handleChoice}
          quitGame={this.quitGame}
        />
        {this.renderRedirect()}
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user
  };
}

export default withRouter(connect(MapStateToProps)(GameContainer));