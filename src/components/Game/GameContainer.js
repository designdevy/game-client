import React from "react";
import GameDisplay from "./GameDisplay";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "../serverUrl";
import { withRouter, Redirect } from "react-router-dom";
import { addUser } from "../../actions";
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

    switch(room.type) {
      case 2:
        return this.setState({values: [
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
        ]});
      case 3:
        return this.setState({values: [
          <img
            className="emoji"
            src="http://blogimages.bloggen.be/girlsworld123/2756129-703a5d968ed8de1b15241d027ecdcb3c.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="http://blogimages.bloggen.be/girlsworld123/2756129-672df81e6d951c25dafaf7de42e6b1a7.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji-300x300.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="http://distillerie-vercors.com/wp-content/uploads/2015/12/1f60e-300x300.png"
            alt="emoji"
          />,
          <img
            className="emoji"
            src="https://cdn.pixabay.com/photo/2017/07/18/15/37/cry-2516128_960_720.png"
            alt="emoji"
          />
        ]});
      default:
        return this.setState({values: [1, 2, 3, 4, 5]});
    }
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
