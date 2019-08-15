import React from "react";
import GameDisplay from "./GameDisplay";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "../serverUrl";
import { withRouter, Redirect } from "react-router-dom";
import { addUser } from "../../actions";
import switchValues from './switchValues'
import "./Game.css";

class GameContainer extends React.Component {
  state = {
    redirect: false,
    values: [1, 2, 3, 4, 5]
  };

  componentDidMount () {
    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );

    this.setState(switchValues(room.type))
  }

  handleChoice = async event => {
    event.preventDefault();

    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );

    await superagent
      .post(`${serverUrl}/choice`)
      .send({
        value: event.currentTarget.value,
        userId: this.props.user.id,
        roomId: room.id
    });
  };

  // remove the user to the current room, if user quit the game
  quitGame = async event => {
    event.preventDefault();
    this.setState({ 
      redirect: true
    });

    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );

    const won = room.stage === 10 ? (parseInt(this.props.user.won) + 1) : parseInt(this.props.user.won)
    const failed = room.stage === 0 ? (parseInt(this.props.user.failed) + 1) : parseInt(this.props.user.failed)

    await superagent
      .put(`${serverUrl}/users/${this.props.user.id}`)
      .send({
        roomId: this.props.match.params.id,
        userId: this.props.user.id,
        won,
        failed
    });

    await superagent
      .get(`${serverUrl}/users/${this.props.user.id}`)
      .then(response => this.props.addUser(response.body));
  };

  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to={"/"} />;
    } else {
      return <div />;
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
          values={this.state.values}
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

export default withRouter(connect(MapStateToProps, { addUser })(GameContainer));
