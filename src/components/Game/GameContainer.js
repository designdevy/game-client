import React from 'react';
import GameDisplay from './GameDisplay'
import { connect } from "react-redux";

class GameContainer extends React.Component {
  render() {
    const room = this.props.rooms.find(room => parseInt(room.id) === parseInt(this.props.match.params.id))
    return <GameDisplay user={this.props.user} room={room}/>
  }
}

function MapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user
  };
}

export default connect(
  MapStateToProps
)(GameContainer);