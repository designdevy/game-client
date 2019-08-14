import React from "react";
import GameDisplay from "./GameDisplay";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "../serverUrl";
import { withRouter, Redirect } from "react-router-dom";
import "./Game.css";

class GameContainer extends React.Component {
  state = {
    redirect: false,
    values: [1, 2, 3, 4, 5]
  };

  handleChoice = async event => {
    event.preventDefault();

    const room = this.props.rooms.find(
      room => parseInt(room.id) === parseInt(this.props.match.params.id)
    );

    await superagent.post(`${serverUrl}/choice`).send({
      value: event.currentTarget.value,
      userId: this.props.user.id,
      roomId: room.id
    });

    if (parseInt(room.stage) >= 7) {
      this.setState({
        values: [
          <img
            className="figure"
            src="https://cdn3.iconfinder.com/data/icons/eldorado-stroke-symbols/40/shape_circle-512.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/400px-Regular_triangle.svg.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/500px-Square_-_black_simple.svg.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://cdn0.iconfinder.com/data/icons/symbols-symbols-add-on-3-vol-1/48/v-26-512.png"
            alt="figure"
          />,
          <img
            className="figure"
            src="https://cdn4.iconfinder.com/data/icons/line-icons-12/64/software_shape_oval-512.png"
            alt="figure"
          />
        ]
      });
    }


  };

  // remove the user to the current room, if user quit the game
  quitGame = async event => {
    event.preventDefault();
    this.setState({ redirect: true });
    await superagent.put(`${serverUrl}/users/${this.props.user.id}`).send({
      roomId: this.props.match.params.id,
      userId: this.props.user.id
    });
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

export default withRouter(connect(MapStateToProps)(GameContainer));
