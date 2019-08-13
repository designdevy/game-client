import React from "react";
import { allRooms } from "../../actions";
import { connect } from "react-redux";
import superagent from "superagent";

class RoomList extends React.Component {
  handleClick = async (event) => {
    event.preventDefault();
    console.log('event.target.value', event.target.value)

    const serverUrl =
      "https://polar-sands-55886.herokuapp.com" ||
      "http://localhost:5000";

    await superagent
    .put(`${serverUrl}/rooms/${event.target.value}`)
    .send({
      roomId: event.target.value,
      userId: this.props.user.id
    })
  };

  render() {
    const rooms = this.props.rooms.map(room => (
      <div key={room.id}>
        <p>
          {room.name} status: {room.status}
        </p>
        <button value={room.id} onClick={this.handleClick}>Join</button>
      </div>
    ));

    return (
      <div className="rooms">
        <h3>Available Rooms:</h3>
        {rooms}
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
  { allRooms }
)(RoomList);
