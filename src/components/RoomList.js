import React from "react";
import { allRooms } from "../actions";
import { connect } from "react-redux";

class RoomList extends React.Component {
  render() {
    const rooms = this.props.rooms.map(room => (
      <div key={room.id}>
        <p>
          {room.name} status: {room.status}
        </p>
        <button onClick={this.onClick}>Join</button>
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
