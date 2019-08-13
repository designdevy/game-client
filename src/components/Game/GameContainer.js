import React from "react";
import GameDisplay from "./GameDisplay";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "../serverUrl";

class GameContainer extends React.Component {
  handleChoice = async event => {
    event.preventDefault();

    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );
    console.log(
      "value:",
      event.target.value,
      "userId:",
      this.props.user.id,
      "roomId:",
      room.id
    );
    await superagent.post(`${serverUrl}/choice`).send({
      value: event.target.value,
      userId: this.props.user.id,
      roomId: room.id
    });
  };

  render() {
    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );
    return (
      <GameDisplay
        user={this.props.user}
        room={room}
        onClick={this.handleChoice}
      />
    );
  }
}

function MapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user
  };
}

export default connect(MapStateToProps)(GameContainer);
