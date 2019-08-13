import React from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "./serverUrl";
import { addUser } from "../actions";
import { Redirect } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginFormContainer from "./SignUpForm/LoginFormContainer";

class RoomList extends React.Component {
  state = {
    roomName: "",
    userName: "",
    email: "",
    password: "",
    redirect: false,
    roomId: ""
  };

  handleClickJoin = async event => {
    event.preventDefault();
    console.log("event.target.value", event.target.value);

    this.setState({
      redirect: true,
      roomId: event.target.value
    });

    await superagent.put(`${serverUrl}/rooms/${event.target.value}`).send({
      roomId: event.target.value,
      userId: this.props.user.id
    });
  };

  handleChangeRoom = event => {
    this.setState({
      roomName: event.target.value
    });
  };

  handleSubmitRoom = async event => {
    event.preventDefault();
    await superagent.post(`${serverUrl}/rooms`).send({
      name: this.state.roomName
    });
    this.setState({
      roomName: ""
    });
  };

  handleChangeUser = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitUser = async event => {
    event.preventDefault();
    await superagent
      .post(`${serverUrl}/users`)
      .send({
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => this.props.addUser(response.body));
    this.setState({
      userName: "",
      email: "",
      password: ""
    });
  };

  renderRedirect = id => {
    if (this.state.redirect === true) {
      return <Redirect to={`/rooms/${id}`} />;
    } else {
      return <h2>Join the game!</h2>;
    }
  };

  render() {
    const rooms = this.props.rooms.map(room => (
      <div key={room.id}>
        <p>{room.name}</p>
        {room.users.length === 2 ? (
          <p>game in progress...</p>
        ) : (
          <div>
            <p>Number of players in the game now: {room.users.length}</p>
            <button value={room.id} onClick={this.handleClickJoin}>
              Join
            </button>
          </div>
        )}
      </div>
    ));

    return (
      <div className="rooms">
        {this.renderRedirect(this.state.roomId)}
        {this.props.user === "Anonymos" ? (
          <div>
            <SignUpForm
              onSubmit={this.handleSubmitUser}
              onChange={this.handleChangeUser}
              userName={this.state.userName}
              email={this.state.email}
              password={this.state.password}
            />
            <LoginFormContainer />
          </div>
        ) : (
          <div>
            <h3>Available Rooms:</h3>
            {rooms}
            <form onSubmit={this.handleSubmitRoom}>
              <h3>Create a new room:</h3>
              <input
                type="text"
                name="roomName"
                value={this.state.roomName}
                placeholder="room name"
                onChange={this.handleChangeRoom}
              />
              <button>Add</button>
            </form>
          </div>
        )}
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

export default connect(
  MapStateToProps,
  { addUser }
)(RoomList);
